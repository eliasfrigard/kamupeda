import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
  return (
    <button onClick={() => {
      if (disabled) return
      onClick()
    }} className={`min-w-32 text-white py-3 px-6 rounded bg-primary-500 duration-100 ${disabled ? 'bg-opacity-50 cursor-default' : 'hover:bg-accent-500 hover:scale-105 cursor-pointer'}`}>
      {children}
    </button>
  );
};

export default Button;