import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
