import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "10")));

    const posts = await BlogPost.find().sort({ createdAt: -1 }).limit(limit).lean();

    return NextResponse.json({
      success: true,
      message: "Blog posts fetched successfully",
      data: { posts },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
