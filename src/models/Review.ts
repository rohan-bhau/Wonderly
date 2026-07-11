import mongoose, { Schema, Document } from "mongoose";

export interface IReviewDocument extends Document {
  tourId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ tourId: 1 });

const Review = mongoose.models.Review ?? mongoose.model<IReviewDocument>("Review", ReviewSchema);
export default Review;
