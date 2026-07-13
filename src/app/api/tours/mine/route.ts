import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
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

    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Only admins can manage tours" },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const skip = (page - 1) * limit;

    const [tours, total] = await Promise.all([
      Tour.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Tour.countDocuments({}),
    ]);

    return NextResponse.json({
      success: true,
      message: "Tours fetched successfully",
      data: {
        tours,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
