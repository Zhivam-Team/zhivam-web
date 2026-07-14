import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

function sheetsClient() {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
}

async function markPaidByQuoteId(quoteId: string) {
    const sheets = sheetsClient();
    const sheetId = process.env.GOOGLE_SHEET_ID!;

    const idRes = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "Sheet1!A:A" });
    const rows = idRes.data.values || [];
    const rowIndex = rows.findIndex(r => r[0] === quoteId);
    if (rowIndex < 1) {
        console.error("Webhook: quote not found for id", quoteId);
        return;
    }
    const sheetRow = rowIndex + 1;

    await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `Sheet1!AH${sheetRow}`,
        valueInputOption: "RAW",
        requestBody: { values: [["paid"]] },
    });
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    const isValid =
        signature.length === expectedSignature.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

    if (!isValid) {
        console.error("Razorpay webhook: invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    let event: {
        event?: string;
        payload?: {
            payment?: { entity?: { notes?: { quote_id?: string } } };
            payment_link?: { entity?: { notes?: { quote_id?: string } } };
            qr_code?: { entity?: { notes?: { quote_id?: string } } };
        };
    };
    try {
        event = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    try {
        // Primary: payment.captured — always available, fires for every successful payment
        if (event.event === "payment.captured") {
            const paymentEntity = event.payload?.payment?.entity;
            const quoteId = paymentEntity?.notes?.quote_id;
            if (quoteId) await markPaidByQuoteId(quoteId);
        }

        if (event.event === "payment_link.paid") {
            const quoteId = event.payload?.payment_link?.entity?.notes?.quote_id;
            if (quoteId) await markPaidByQuoteId(quoteId);
        }
        // Optional: if QR Codes product gets activated later, this fires too — harmless either way
        if (event.event === "qr_code.credited") {
            const quoteId =
                event.payload?.payment?.entity?.notes?.quote_id ||
                event.payload?.qr_code?.entity?.notes?.quote_id;
            if (quoteId) await markPaidByQuoteId(quoteId);
        }
    } catch (err) {
        console.error("Razorpay webhook processing error:", err);
    }

    return NextResponse.json({ received: true });
}