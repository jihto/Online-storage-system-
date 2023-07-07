import React from 'react'
import { IconType } from 'react-icons';

interface ButtonRoundProps{
    onClick: () => void;
    icon: IconType
}

const ButtonRound: React.FC<ButtonRoundProps> = ({
    onClick,
    icon: Icon,
}) => {
    return (
        <button 
            onClick={onClick} 
            className='
                rounded-full 
                text-white 
                bg-gray-400 p-3
                hover:bg-default
                hover:opacity-70
            '>
            <Icon size={24}/>
        </button>
    )
}

export default ButtonRound;