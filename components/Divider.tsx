import React from "react";

const Divider: React.FC = ({ className = "" }: { className: string }) => {
  return (
    <div
      className={`h-[1px] bg-gradient-to-r from-accent-800 to-primary-800 opacity-80 rounded-full w-full ${className}`}
    />
  );
};

export default Divider;
