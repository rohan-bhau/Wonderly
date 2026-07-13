import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { tourId, phone, guests, specialRequests } = body;

    if (!tourId || !phone || !guests) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (guests < 1) {
      return NextResponse.json(
        { success: false, message: "Guests must be at least 1" },
        { status: 400 }
      );
    }

    if (user.role === "admin") {
      return NextResponse.json(
        { success: false, message: "Admins cannot book tours" },
        { status: 400 }
      );
    }

    await dbConnect();

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    if (tour.createdBy.toString() === user._id.toString()) {
      return NextResponse.json(
        { success: false, message: "You cannot book your own tour" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      tourId,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      phone,
      guests,
      specialRequests: specialRequests || "",
    });

    return NextResponse.json(
      { success: true, message: "Booking confirmed successfully", data: booking },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
