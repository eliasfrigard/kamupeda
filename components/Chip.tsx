import React from 'react'
import { FaTimes } from "react-icons/fa"

interface ChipProps {
  children: React.ReactNode
  onDelete?: () => void
}

const Chip: React.FC<ChipProps> = ({ children, onDelete }) => {
  if (!children) return null

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 px-4 text-white text-xs rounded-full shadow font-semibold tracking-wider flex flex-row justify-center items-center">
      {children}
      {
        onDelete && (
          <button
            onClick={onDelete}
          >
            <div className='ml-2 aspect-square h-full flex items-center justify-center'>
              <FaTimes />
            </div>
          </button>
        )
      }
    </div>
  );
};

export default Chip
