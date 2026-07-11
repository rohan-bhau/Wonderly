import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPostDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  createdAt: Date;
}

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const BlogPost =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPostDocument>("BlogPost", BlogPostSchema);
export default BlogPost;
