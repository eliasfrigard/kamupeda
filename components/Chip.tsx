import React from "react";
import { FaTimes } from "react-icons/fa";

interface ChipProps {
  children: React.ReactNode;
  onDelete?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ children, onDelete, className = "" }) => {
  if (!children) return null;

  return (
    <div
      className={`bg-gradient-to-r from-accent-500 to-accent-500 p-3 px-4 text-secondary-400 text-xs rounded-full shadow font-semibold tracking-wide flex flex-row justify-center items-center ${className}`}
    >
      {children}
      {onDelete && (
        <button onClick={onDelete}>
          <div className='ml-2 aspect-square h-full flex items-center justify-center'>
            <FaTimes />
          </div>
        </button>
      )}
    </div>
  );
};

export default Chip;
