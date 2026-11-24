import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      "rzp_live_U40IbdT5uMc3ZW";
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET || "ywHZp7c8E9DD5JYkF1tCPsnW";

    const body = await req.json().catch(() => ({}));
    const amount = body.amount || 9900; // 99 INR in paise

    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: "INR",
        receipt: `sbm_${Date.now().toString(36)}`,
        notes: {
          service: "SayByMe Proposal Private Link",
          sender: body.sender || "Someone Special",
          recipient: body.recipient || "Special One",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay order creation failed:", errorText);
      return NextResponse.json(
        { error: "Failed to create Razorpay order", details: errorText },
        { status: 500 }
      );
    }

    const order = await response.json();
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
    });
  } catch (err: any) {
    console.error("Error creating Razorpay order:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
