import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();

    const filter = user.role === "admin" ? {} : { createdBy: user._id };
    const tours = await Tour.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      message: "Tours fetched successfully",
      data: { tours },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
