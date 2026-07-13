import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get("tourId");

    if (!tourId) {
      return NextResponse.json(
        { success: false, message: "Missing tourId" },
        { status: 400 }
      );
    }

    await dbConnect();

    const booking = await Booking.findOne({
      tourId,
      userId: user._id,
      status: "confirmed",
    });

    return NextResponse.json({
      success: true,
      data: { booked: !!booking, bookingId: booking?._id || null },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
