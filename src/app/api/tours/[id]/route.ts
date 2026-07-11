import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const tour = await Tour.findById(id).lean();
    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    const relatedTours = await Tour.find({
      category: tour.category,
      _id: { $ne: tour._id },
    })
      .limit(4)
      .lean();

    return NextResponse.json({
      success: true,
      message: "Tour fetched successfully",
      data: { tour, relatedTours },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;

    const tour = await Tour.findById(id);
    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    if (tour.createdBy.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    await Tour.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
