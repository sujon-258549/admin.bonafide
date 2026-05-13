import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import React, { useState } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-outline"
  | "link"
  | "dashed";
type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

interface CustomButtonProps extends Omit<AntButtonProps, "size" | "variant"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /**
   * When true, the button applies NO built-in styling (no base classes,
   * no size classes, no variant inline styles). The consumer's className
   * fully controls the visual. Useful when migrating an existing native
   * <button> to the shared component without changing its design.
   */
  unstyled?: boolean;
}

// Default (non-hover) inline styles per variant
const variantDefaultStyle: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--primary)",
    borderColor: "var(--primary)",
    color: "var(--primary-foreground)",
  },
  secondary: {
    backgroundColor: "var(--secondary)",
    borderColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "var(--muted-foreground)",
  },
  danger: {
    backgroundColor: "var(--destructive)",
    borderColor: "var(--destructive)",
    color: "#fff",
  },
  "danger-outline": {
    backgroundColor: "transparent",
    borderColor: "var(--destructive)",
    color: "var(--destructive)",
  },
  link: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "var(--primary)",
    padding: 0,
    height: "auto",
  },
  dashed: {
    backgroundColor: "transparent",
    borderColor: "var(--border)",
    color: "var(--foreground)",
    borderStyle: "dashed",
  },
};

// Hover inline styles per variant
const variantHoverStyle: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "color-mix(in srgb, var(--primary) 85%, black)",
    borderColor: "color-mix(in srgb, var(--primary) 85%, black)",
    color: "var(--primary-foreground)",
  },
  secondary: {
    backgroundColor: "color-mix(in srgb, var(--secondary) 85%, black)",
    borderColor: "color-mix(in srgb, var(--secondary) 85%, black)",
    color: "var(--secondary-foreground)",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "var(--primary)",
    color: "var(--primary)",
  },
  ghost: {
    backgroundColor: "var(--muted)",
    borderColor: "transparent",
    color: "var(--foreground)",
  },
  danger: {
    backgroundColor: "color-mix(in srgb, var(--destructive) 85%, black)",
    borderColor: "color-mix(in srgb, var(--destructive) 85%, black)",
    color: "#fff",
  },
  "danger-outline": {
    backgroundColor: "color-mix(in srgb, var(--destructive) 10%, transparent)",
    borderColor: "var(--destructive)",
    color: "var(--destructive)",
  },
  link: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "color-mix(in srgb, var(--primary) 85%, black)",
    textDecoration: "underline",
  },
  dashed: {
    backgroundColor: "transparent",
    borderColor: "var(--primary)",
    color: "var(--primary)",
    borderStyle: "dashed",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md h-8",
  md: "px-4 py-2 text-sm rounded-md h-10",
  lg: "px-6 py-3 text-base rounded-md h-12",
  icon: "w-11 h-11 rounded-md",
  "icon-sm": "w-8 h-8 rounded-md",
};

const Button: React.FC<CustomButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  unstyled = false,
  children,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (unstyled) {
    // Render a native <button> so the consumer's className/style fully
    // controls the visual — no Ant or variant interference.
    const {
      htmlType,
      onClick,
      disabled,
      ...rest
    } = props as AntButtonProps & {
      htmlType?: "button" | "submit" | "reset";
    };
    return (
      <button
        type={htmlType ?? "button"}
        className={className}
        style={style}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        disabled={disabled}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  const baseClasses =
    "transition-all font-medium flex items-center justify-center border-solid";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

  const computedStyle: React.CSSProperties = {
    ...(isHovered ? variantHoverStyle[variant] : variantDefaultStyle[variant]),
    transition: "all 0.2s ease",
    ...style, // allow external style overrides
  };

  return (
    <AntButton
      className={combinedClasses}
      style={computedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
