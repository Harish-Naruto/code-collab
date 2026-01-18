import { ComponentProps } from "react";
import { cn } from "../lib/utils"; // ✅ Corrected relative path (no ./../)

interface BadgeProps extends ComponentProps<"span"> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

const Badge = ({ className = "", variant = "default", ...props }: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition";

  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    success: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    destructive: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props} />
  );
};

export default Badge;
