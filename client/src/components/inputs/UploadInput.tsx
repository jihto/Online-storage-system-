import React from 'react'
import { FaUpload } from 'react-icons/fa';

interface UploadInputProps{
    onChange: (e: any) => void;
}

const UploadInput:React.FC<UploadInputProps> = ({
    onChange,

}) => {
    return ( 
        <label 
            htmlFor='file' 
            className='
                cursor-pointer
                w-full
                bg-default
                shadow-md
                hover:opacity-40
                hover:shadow-lg
                py-2 
                px-5
                rounded-full
                flex
                justify-center
                gap-5
                text-lg
                items-center
                relative
            '
        >
            Choose File
            <div className='absolute right-1 bg-white p-2 rounded-full'>
                <FaUpload/>
            </div> 
            <input
                multiple
                id='file'
                className='hidden' 
                type='file'
                onChange={onChange}
            />
        </label> 
    )
}

export default UploadInput