import React from "react";
import clsx from "clsx";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer",
        "focus:outline-none focus:ring-4",

        {
          // =====================
          // Variants
          // =====================

          "bg-[#E02C69] text-white hover:bg-[#C91F59] focus:ring-[#E02C69]/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5":
            variant === "primary",

          "bg-white text-[#3D2430] border border-[#F0C8CF] hover:border-[#E02C69] hover:bg-[#FFF5F8]":
            variant === "secondary",

          "border border-[#E02C69] text-[#E02C69] bg-transparent hover:bg-[#E02C69] hover:text-white":
            variant === "outline",

          "bg-[#B98A2A] text-white hover:bg-[#A67A1F] focus:ring-[#B98A2A]/20 shadow-lg":
            variant === "gold",

          "bg-red-500 text-white hover:bg-red-600":
            variant === "danger",

          // =====================
          // Sizes
          // =====================

          "h-10 px-4 text-sm": size === "sm",

          "h-12 px-6 text-base": size === "md",

          "h-14 px-8 text-lg": size === "lg",

          // =====================
          // Disabled
          // =====================

          "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none":
            disabled || loading,
        },

        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.3"
            />
            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          Loading...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;