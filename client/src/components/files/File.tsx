'use client';
 
import React, { useState } from 'react' 
import FileDisplay from './FileDisplay'; 
import useShowFullModal from '@/hooks/useShowFullModal';

interface FileProps{
    item: any;
}
export interface TypeFile{
    name: string;
    type: string; 
    date?: Date;
}

const File:React.FC<FileProps> = ({
    item
}) => {
    const showFullModal = useShowFullModal(); 
    const file:TypeFile = {
        name: item.originalname,
        type: item.fileName, 
    } 
    return (
        <div 
            onClick={()=>showFullModal.onOpen(item._id ,item.fileName, item.originalname, item.isFavorite)} 
            className='
                relative 
                rounded-3xl 
                w-full 
                border-base 
                grid 
                justify-center 
                items-center 
                p-1 
                hover:shadow-xl'
        >
            { file.type || file.name ? <FileDisplay file={file} /> : null}
        </div>
    )
} 
export default File; 