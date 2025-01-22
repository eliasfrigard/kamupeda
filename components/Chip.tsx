import React from "react";
import { FaTimes } from "react-icons/fa";

interface ChipProps {
  children: React.ReactNode;
  onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ children, onDelete }) => {
  if (!children) return null;

  return (
    <div className='bg-gradient-to-r from-accent-500 to-accent-500 p-3 px-4 text-secondary-400 text-xs rounded-full shadow font-semibold tracking-wider flex flex-row justify-center items-center'>
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
