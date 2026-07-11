import { z } from "zod";

export const tourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be positive"),
  departureDate: z.string().min(1, "Departure date is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  groupSize: z.coerce.number().int().positive("Group size must be a positive number"),
  difficulty: z.enum(["easy", "moderate", "challenging"]),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  itinerary: z
    .array(
      z.object({
        day: z.coerce.number().int().positive(),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(1, "At least one itinerary item is required"),
  inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
  exclusions: z.array(z.string()).optional(),
});

export type TourInput = z.infer<typeof tourSchema>;
