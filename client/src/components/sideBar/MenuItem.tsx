'use client';


import React, { MouseEvent, MouseEventHandler, ReactNode } from 'react'
import { IconType } from 'react-icons';

interface MenuItemProps {
    label: string | ReactNode; 
    icon?: IconType;
    locationIcon?: 'left' | 'right'; 
    onClick?: ((event: any) => void);
    outline?: boolean;
    isChoose?: boolean | (()=> boolean);
}

const MenuItem:React.FC<MenuItemProps> = ({
    label,
    icon:Icon,
    locationIcon = 'left',
    onClick,
    outline = false,
    isChoose = false,
}) => {
return (
    <button 
        className={`
            flex items-center w-11/12 gap-2 p-2 text-sm xl:text-base m-1 max-w-full max-h-full
            ${ locationIcon !== 'left' && 'flex-row-reverse'}
            ${ isChoose 
                ? 'bg-default rounded-xl p-3 shadow-lg text-white' 
                : outline 
                    ? 'bg-gray-200' 
                    : 'bg-gray-100 rounded-full shadow-sm hover:shadow-xl justify-between '
            
            } 
            transition-all duration-600 opacity-90 cursor-pointer 
            hover:opacity-75
        `}
        onClick={onClick}
    >
        { Icon && <Icon className='text-text-xl lg:text-2xl'/> }
        {label}
    </button>
)
}

export default MenuItem