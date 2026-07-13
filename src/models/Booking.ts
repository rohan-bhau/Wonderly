import mongoose, { Schema, Document } from "mongoose";

export interface IBookingDocument extends Document {
  tourId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  phone: string;
  guests: number;
  specialRequests?: string;
  status: "confirmed" | "cancelled";
  createdAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    specialRequests: { type: String, default: "" },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

BookingSchema.index({ userId: 1 });
BookingSchema.index({ tourId: 1 });

const Booking =
  mongoose.models.Booking ??
  mongoose.model<IBookingDocument>("Booking", BookingSchema);
export default Booking;
