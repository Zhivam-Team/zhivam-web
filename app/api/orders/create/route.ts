import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import razorpay from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Session
    const sessionCookie = request.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;
    const userEmail = decodedClaims.email;

    // Fetch user details
    const userDocRef = adminDb.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    const userName = userDoc.exists ? userDoc.data()?.displayName || "Customer" : "Customer";

    // 2. Read Cart Items
    const cartSnapshot = await adminDb.collection("carts").doc(userId).collection("items").get();
    
    if (cartSnapshot.empty) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const items: Record<string, any>[] = [];
    let totalAmount = 0;

    cartSnapshot.forEach((doc) => {
      const item = doc.data();
      items.push(item);
      totalAmount += (item.price || 0) * (item.quantity || 1);
    });

    if (totalAmount <= 0) {
      return NextResponse.json({ error: "Invalid total amount" }, { status: 400 });
    }

    // 3. Create Razorpay Order
    const amountInPaise = Math.round(totalAmount * 100);
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `reipt_${userId}_${Date.now().toString().slice(-6)}`,
    });

    // 4. Save Pending Order to Firestore
    const orderRef = adminDb.collection("orders").doc();
    await orderRef.set({
      userId,
      userEmail,
      userName,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    // 5. Return success data
    return NextResponse.json({
      orderId: orderRef.id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
