import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect();
    const { slug } = await params;

    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post fetched successfully",
      data: { post },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
