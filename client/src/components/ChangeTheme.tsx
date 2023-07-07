'use client'
import React, { memo, useState } from 'react'
import { BsEmojiSunglasses, BsMoonStars, BsSun } from 'react-icons/bs'

interface ChangeThemeProps{

}

const ChangeTheme:React.FC<ChangeThemeProps> = () => {
    const [switchTheme, setSwitchTheme] = useState<boolean>(true);
    return (
        <div className='flex items-center'>
            <button className='inline-block relative h-10 w-16' onClick={()=>setSwitchTheme(prev => !prev)}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full cursor-pointer shadow-lg 
                ${switchTheme ? 'bg-white' : 'bg-black'}`}
            > 
                <div className={`transition duration-500 absolute top-1 left-1 p-1 w-1/2 text-2xl rounded-full shadow-xl 
                ${switchTheme ? 'translate-x-0 text-white bg-black' : 'translate-x-6  bg-white'}`}
                >
                { switchTheme ? <BsSun/> : <BsMoonStars/>}
                </div> 
            </div>
            </button>   
        </div>
    )
}

export default memo(ChangeTheme)