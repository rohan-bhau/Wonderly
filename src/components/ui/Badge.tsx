interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-primary bg-[rgba(247,250,248,0.9)] backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}
