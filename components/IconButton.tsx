import React from 'react'

interface IconButtonProps {
  icon: React.ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, disabled = false, className }) => {
  const classes = `h-10 aspect-square rounded-md border bg-opacity-70 duration-100 flex justify-center items-center ${className} ${disabled ? 'opacity-50 bg-gray-500' : 'hover:bg-opacity-100 cursor-pointer'}`

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {icon}
    </button>
  )
}

export default IconButton
