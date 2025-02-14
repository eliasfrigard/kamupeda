import React from "react";

const Divider = ({ className = "opacity-80" }: { className?: string }) => {
  return (
    <div
      className={`h-[1px] bg-gradient-to-r from-accent-800 to-primary-800 rounded-full w-full ${className}`}
    />
  );
};

export default Divider;
