// export function Button({ children, className, ...props }) {
//   return (
//     <button
//       {...props}
//       className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

import type { ButtonHTMLAttributes } from "react";
import React from "react";
import { cn } from "../lib/utils"; // Make sure this exists

type Variant = "default" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-green-600 hover:bg-green-700 text-white",
  ghost: "bg-transparent hover:bg-gray-800 text-white",
  outline: "border border-white text-white hover:bg-white hover:text-green-600",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "font-medium rounded transition-all duration-300 transform hover:scale-105",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
}
