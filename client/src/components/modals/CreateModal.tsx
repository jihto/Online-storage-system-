'use client';
import React, { useEffect, useState } from 'react'
import Model from './Modal'
import useCreateModel from '@/hooks/useCreateModal'
import Modal from './Modal';
import useUploadModel from '@/hooks/useUploadModel';
import useNewFolderModal from '@/hooks/useNewFolderModal';

interface CreateModalProps{
    onOpen: boolean;
}

const CreateModal: React.FC<CreateModalProps> = ({onOpen}) =>{
    const [isOpen,setIsOpen] = useState(onOpen);
    const uploadModal = useUploadModel();
    const newFolder = useNewFolderModal()
    useEffect(() => {
        setIsOpen(onOpen)
    },[onOpen]);
    const hanldeUploadFile = () =>{
        setIsOpen(false);
        uploadModal.onOpen();
    }

    const handleShowNewFolder = () =>{
        setIsOpen(false); 
        newFolder.onOpen();
    }

    if(!onOpen)
        return null
    return (
        <div className={`
            grid bg-default rounded-lg shadow-lg transition-opacity duration-700  p-4
            ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}>
            <p>New...</p>
            <div className='w-full mt-3 grid p-1 gap-1'>
                <button 
                    className='bg-white px-14 py-2 shadow-sm shadow-white border-b-2 rounded-lg hover:scale-105 hover:opacity-75'
                    onClick={handleShowNewFolder}
                >
                    New folder
                </button>
                <button 
                    onClick={hanldeUploadFile}
                    className='px-14 py-2 bg-white shadow-sm shadow-white border-b-2 rounded-lg hover:scale-105 hover:opacity-75'
                >
                    Upload File
                </button>
                <button 
                    className='px-14 py-2 bg-white shadow-sm shadow-white border-b-2 rounded-lg hover:scale-105 hover:opacity-75'
                >
                    Upload folder
                </button>
            </div>
        </div> 
    ) 
}

export default CreateModal;