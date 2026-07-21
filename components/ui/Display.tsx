import type { ElementType, ReactNode } from "react";

export default function Display({ children, as: Tag = "h2", italic = false, className = "" }: { children: ReactNode; as?: ElementType; italic?: boolean; className?: string }) {
  return (
    <Tag className={`font-display tracking-tight ${italic ? "italic" : ""} ${className}`} >
      {children}
    </Tag>
  );
}
