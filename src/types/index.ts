export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatarUrl?: string;
  createdAt: Date;
}

export interface ITour {
  _id: string;
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
  createdBy: string;
  createdAt: Date;
}

export interface IReview {
  _id: string;
  tourId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  createdAt: Date;
}

export interface INewsletterSubscriber {
  email: string;
  subscribedAt: Date;
}
