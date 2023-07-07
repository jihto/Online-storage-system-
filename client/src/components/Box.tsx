import React from 'react'
import { IconType } from 'react-icons';

interface BoxProps{ 
    content: string | React.ReactElement; 
    icon?: IconType;
    color?: string;
    locationContent?: 'col' | 'row';
}

const Box: React.FC<BoxProps> = ({ 
    content,
    icon: Icon,
    color,
    locationContent = 'col',
}) => {
    return (
        <div className={`
            flex
            justify-center 
            items-center 
            text-white 
            font-mono 
            gap-1 
            w-full 
            h-auto  
            shadow-lg 
            rounded-xl
            font-bold 
            hover:opacity-90
            hover:shadow-xl
            hover:scale-105 
            ${ locationContent === 'col' ? 'flex-col px-5 py-2' : 'flex-row px-2 py-4' }
            ${color ? color : 'bg-gray-400'} 
        `}>
            {content}
            { Icon && <Icon size={30}/>}
        </div>
    )
}

export default Box