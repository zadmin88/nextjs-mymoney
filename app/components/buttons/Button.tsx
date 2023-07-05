'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  color?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  rouded?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color,
  onClick,
  disabled,
  rouded,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
       
        font-semibold
        relative
        disabled:bg-gray-300
        disabled:cursor-not-allowed               
         hover:bg-gray-300
         hover:text-white 
        transition
        w-full
        py-3
        ${rouded ? 'rounded-full' : 'rounded-lg'}
        ${
          color === 'white'
            ? 'bg-white text-gray-800'
            : color === 'lime'
            ? 'bg-brand-lime  text-white'
            : color === 'red  text-white'
            ? 'bg-red-500 text-white'  
            : 'bg-gray-800  text-white'
        }`}
    >
      {Icon && (
        <Icon
          size={24}
          className='
            absolute
            left-4
            top-3
          '
        />
      )}
      {label}
    </button>
  );
};

export default Button;
