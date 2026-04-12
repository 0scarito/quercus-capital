import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/40 backdrop-blur-[12px] border border-white/20 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
