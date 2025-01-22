import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  children,
  className,
}) => {
  return (
    <>
      <button
        onClick={() => {
          if (disabled) return;
          onClick();
        }}
        className={`hidden lg:block min-w-32 text-white py-3 px-6 rounded bg-primary-500 duration-100 ${
          disabled
            ? "bg-opacity-50 cursor-default"
            : "hover:bg-accent-500 hover:scale-105 cursor-pointer"
        } ${className}`}
      >
        {children}
      </button>

      {/* MOBILE */}

      <button
        onClick={() => {
          if (disabled) return;
          onClick();
        }}
        className={`lg:hidden flex-1 bg-primary-700 text-white font-medium tracking-wide p-4 rounded-lg duration-100 ${
          disabled
            ? "bg-opacity-50 cursor-default"
            : "hover:bg-accent-500 hover:scale-105 cursor-pointer"
        } ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
