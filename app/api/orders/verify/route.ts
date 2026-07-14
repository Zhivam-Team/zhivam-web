import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ error: "Missing required payment details" }, { status: 400 });
    }

    // 1. Verify Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new Error("Razorpay secret not configured");
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Fetch Order
    const orderRef = adminDb.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    const orderData = orderDoc.data()!;
    
    // Ensure the razorpayOrderId matches what was generated
    if (orderData.razorpayOrderId !== razorpay_order_id) {
       return NextResponse.json({ error: "Order ID mismatch" }, { status: 400 });
    }

    // 3. Update Order Status
    await orderRef.update({
      status: "paid",
      paymentId: razorpay_payment_id,
      updatedAt: new Date().toISOString()
    });

    // 4. Clear User Cart
    const userId = orderData.userId;
    const cartItemsRef = adminDb.collection("carts").doc(userId).collection("items");
    const cartItemsSnapshot = await cartItemsRef.get();
    
    const batch = adminDb.batch();
    cartItemsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // 5. Send Emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
    
    let itemsHtml = `<ul>`;
    let itemsText = ``;
    orderData.items.forEach((item: any) => {
       itemsHtml += `<li>${item.quantity}x ${item.title} - ${formatter.format(item.price * item.quantity)}</li>`;
       itemsText += `- ${item.quantity}x ${item.title} - ${formatter.format(item.price * item.quantity)}\n`;
    });
    itemsHtml += `</ul>`;

    // Mail to Customer
    try {
        await transporter.sendMail({
            from: `"Zhivam Services" <${process.env.SMTP_USER}>`,
            to: orderData.userEmail,
            subject: `Order Confirmation - ${orderId}`,
            text: `Hi ${orderData.userName},\n\nThank you for your order! Your payment has been received successfully.\n\nOrder Details:\n${itemsText}\nTotal: ${formatter.format(orderData.totalAmount)}\n\nOrder ID: ${orderId}\nPayment ID: ${razorpay_payment_id}\n\nWe will begin processing your services shortly.`,
            html: `<h3>Thank you for your order, ${orderData.userName}!</h3><p>Your payment was successful.</p><h4>Order Details:</h4>${itemsHtml}<p><strong>Total:</strong> ${formatter.format(orderData.totalAmount)}</p><br/><p><strong>Order ID:</strong> ${orderId}</p><p><strong>Payment ID:</strong> ${razorpay_payment_id}</p><p>We will begin processing your services shortly.</p>`
        });
    } catch (e) {
        console.error("Failed to send customer email", e);
    }
    
    // Mail to Admin
    if (adminEmail) {
        try {
            await transporter.sendMail({
                from: `"Zhivam System" <${process.env.SMTP_USER}>`,
                to: adminEmail,
                subject: `New Order Received - ${orderId}`,
                text: `A new order has been paid.\n\nCustomer: ${orderData.userName} (${orderData.userEmail})\nTotal: ${formatter.format(orderData.totalAmount)}\nOrder ID: ${orderId}\nPayment ID: ${razorpay_payment_id}\n\nItems:\n${itemsText}`,
                html: `<h3>New Order Received</h3><p><strong>Customer:</strong> ${orderData.userName} (${orderData.userEmail})</p><p><strong>Total:</strong> ${formatter.format(orderData.totalAmount)}</p><p><strong>Order ID:</strong> ${orderId}</p><p><strong>Payment ID:</strong> ${razorpay_payment_id}</p><h4>Items:</h4>${itemsHtml}`
            });
        } catch (e) {
            console.error("Failed to send admin email", e);
        }
    }

    return NextResponse.json({ success: true, orderId: orderId }, { status: 200 });

  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
