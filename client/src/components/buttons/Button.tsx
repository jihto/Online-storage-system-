import React, { ReactNode, memo } from 'react'
import { IconType } from 'react-icons';

interface ButtonProps{
    type: 'submit' | 'button' | 'reset';
    label: string | ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button: React.FC<ButtonProps> =({
    label, 
    type,
    onClick,
    disabled = false,
    small,
    outline = false,
    icon: Icon,
}) =>{
    return ( 
        <button  
            disabled={disabled} 
            type={type}
            className={`relative  w-full font-bold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg  hover:opacity-80
                ${outline ? 'bg-rose-500' : 'bg-default'} 
                ${outline ? 'text-white' : 'text-black'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'py-1' : 'py-2'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}  
            onClick={onClick} 
        >
            {label}
            {Icon && ( <Icon size={24} className="absolute left-4 top-2" /> )}
        </button> 
    )
}

export default memo(Button)