import mongoose, { Schema, Document } from "mongoose";

export interface ITourDocument extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  duration: string;
  groupSize: number;
  difficulty: "easy" | "moderate" | "challenging";
  location: string;
  images: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  departureDate: string;
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TourSchema = new Schema<ITourDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true },
    groupSize: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging"],
      default: "moderate",
    },
    location: { type: String, required: true },
    images: [{ type: String }],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    departureDate: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TourSchema.index({ category: 1 });
TourSchema.index({ price: 1 });
TourSchema.index({ featured: 1 });
TourSchema.index({ location: "text", title: "text", shortDescription: "text" });

const Tour = mongoose.models.Tour ?? mongoose.model<ITourDocument>("Tour", TourSchema);
export default Tour;
