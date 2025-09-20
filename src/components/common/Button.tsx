import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  className,
  type = "button",
  disabled = false
}: ButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary-hover text-primary-foreground";
      case "secondary":
        return "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
      case "success":
        return "bg-success hover:bg-success/90 text-success-foreground";
      case "warning":
        return "bg-warning hover:bg-warning/90 text-warning-foreground";
      case "destructive":
        return "bg-destructive hover:bg-destructive/90 text-destructive-foreground";
      default:
        return "bg-primary hover:bg-primary-hover text-primary-foreground";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-8 px-3 text-sm";
      case "md":
        return "h-10 px-4";
      case "lg":
        return "h-12 px-6 text-lg";
      default:
        return "h-10 px-4";
    }
  };

  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getVariantClass(),
        getSizeClass(),
        className
      )}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;