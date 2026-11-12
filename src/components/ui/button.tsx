import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "coral"
  | "secondary"
  | "outline"
  | "ghost"
  | "teal"
  | "gold"
  | "danger";

type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-cream shadow-soft hover:bg-plum-deep hover:shadow-lift",
  coral:
    "bg-coral text-white shadow-glow hover:bg-coral-deep",
  secondary:
    "border border-line bg-white/85 text-ink shadow-sm hover:border-plum/20 hover:bg-white",
  outline:
    "border border-plum/20 bg-transparent text-plum hover:border-plum/40 hover:bg-plum-mist",
  ghost: "text-ink-soft hover:bg-sand hover:text-ink",
  teal: "bg-teal text-white shadow-soft hover:bg-teal-deep",
  gold: "bg-gold text-plum-deep shadow-soft hover:bg-gold-deep hover:text-white",
  danger:
    "bg-coral-soft text-coral-deep hover:bg-coral hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
  icon: "h-10 w-10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  ),
);

Button.displayName = "Button";
