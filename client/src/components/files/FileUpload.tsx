'use client'
import React, { useState } from 'react'
import UploadInput from '../inputs/UploadInput'

interface FileUploadProps{
    onFilesUpload: (files: FileList) => void;
}

const FileUpload:React.FC<FileUploadProps> = ({ onFilesUpload }) => { 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files)
            onFilesUpload(files);
    }
    return ( 
        <UploadInput onChange={handleFileChange}/> 
    )
}

export default FileUpload