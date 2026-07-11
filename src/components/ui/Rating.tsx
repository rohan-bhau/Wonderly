import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export default function Rating({ rating, reviewCount, className = "" }: RatingProps) {
  return (
    <div className={`flex items-center gap-1 text-accent ${className}`}>
      <Star className="w-4 h-4 fill-current" />
      <span className="text-sm font-medium">
        {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}
