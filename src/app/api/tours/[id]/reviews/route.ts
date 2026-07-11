import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import Tour from "@/models/Tour";
import { getCurrentUser } from "@/lib/auth";
import { reviewSchema } from "@/lib/validation/review";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const reviews = await Review.find({ tourId: id }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      message: "Reviews fetched successfully",
      data: { reviews },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", data: parsed.error.flatten().fieldErrors },
        { status: 400 }
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

    await Review.create({
      tourId: id,
      userId: user._id,
      userName: user.name,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    });

    const stats = await Review.aggregate([
      { $match: { tourId: tour._id } },
      { $group: { _id: null, averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
    ]);

    if (stats.length > 0) {
      tour.averageRating = Math.round(stats[0].averageRating * 10) / 10;
      tour.reviewCount = stats[0].reviewCount;
      await tour.save();
    }

    return NextResponse.json(
      { success: true, message: "Review submitted successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
