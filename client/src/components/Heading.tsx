'use client';
import React, { memo } from 'react'

interface HeadingProps{
    title: string;
    subTitle?: string;
    center?: boolean;
    size?: 'large' | 'medium' | 'small',
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subTitle,
    center = true,
    size = 'large',
}) => { 
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className={`
                font-bold
                ${size === 'large' && 'text-2xl'}
                ${size === 'medium' && 'text-base' }
                ${size === 'small' && 'text-sm' }
            `}>
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subTitle}
            </div>
        </div>
    );
}

export default memo(Heading);