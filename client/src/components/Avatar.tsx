import React from 'react'
import DefaultAvatar from 'public/images/avatar.png';
import Image from 'next/image';

interface AvatarProps{
    src?: string | null | undefined;
    size?: 'medium' | 'large' | 'small';
}

const Avatar:React.FC<AvatarProps> = ({ 
    src,
    size = 'medium'
}) => {
    return (
        <Image 
            className={`
                rounded-full 
                object-cover 
                border-base
                shadow-md
                ${size === 'large' && 'w-12 h-12'}
                ${size === 'medium' && 'w-10 h-10'}
                ${size === 'small' && 'w-8 h-8'}
            `}
            width={40}
            height={40}
            src={src || DefaultAvatar}
            alt="Avatar"
        />
    )
}

export default Avatar