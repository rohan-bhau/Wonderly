interface PriceDisplayProps {
  price: number;
  className?: string;
}

export default function PriceDisplay({ price, className = "" }: PriceDisplayProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs text-body">Starting from</span>
      <span className="text-xl font-bold text-primary">
        ${price.toLocaleString()}
      </span>
    </div>
  );
}
