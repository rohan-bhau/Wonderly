import { ReactNode } from "react";

interface IconTextProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export default function IconText({ icon, text, className = "" }: IconTextProps) {
  return (
    <div className={`flex items-center gap-1.5 text-sm text-body ${className}`}>
      <span className="text-primary-light shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
