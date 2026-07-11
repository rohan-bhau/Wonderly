import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await NewsletterSubscriber.findOne({
      email: parsed.data.email.toLowerCase(),
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already subscribed" },
        { status: 409 }
      );
    }

    await NewsletterSubscriber.create({ email: parsed.data.email });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
