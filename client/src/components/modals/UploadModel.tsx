'use client'
import React, { useEffect, useState } from 'react'
import Model from './Modal'
import useUploadModel from '@/hooks/useUploadModel';
import FileUpload from '../files/FileUpload'
import FileDisplay from '../files/FileDisplay'
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';

import { uploadFile } from '@/actions/file';
import { useRouter } from 'next/router';

interface UploadModelProps{

}

const UploadModel:React.FC<UploadModelProps> = () => {
    const uploadModel = useUploadModel();
    const breadCrumb = useSetBreadCrumb();
    const router = useRouter()
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const handleFiles = (files: FileList) => {  
        const newFiles: File[] = Array.from(files);
        setUploadFiles([...uploadFiles, ...newFiles]); 
    }  
    const handleRemoveFile = (file: File, files: File[]) => {
        const newFiles: File[] = files.filter(item => item !== file ); 
        setUploadFiles(newFiles);
    }

    const handleSubmit = async() => {  
        if(Array.isArray(uploadFiles) && uploadFiles.length > 0 || breadCrumb.idCurrent !== ''){ 
            const formData: FormData = new FormData();
            uploadFiles.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('idFolder', breadCrumb.idCurrent); 

            const response = await uploadFile(formData);
            console.log(response.data);
            toast.success("Upload file successfull");
            setUploadFiles([]);
            uploadModel.onClose();
            router.replace(router.asPath);
        }
        else{
            toast.error("Not file to upload");
        }
    }
    const body = (
        <> 
            <div className='relative h-[500px] border-dashed border-[1.5px] border-gray-500 shadow-md p-2 rounded-lg w-full grid grid-cols-3 grid-rows-3 gap-2 mb-5'> 
                {!Array.isArray(uploadFiles) || !uploadFiles.length   &&
                    <label className='hover:cursor-pointer absolute top-1/3 left-[40%] text-gray-500 flex flex-col items-center justify-center' htmlFor="file">
                        <p><AiOutlineCloudUpload size={60}/></p>
                        <p>Dreag and Drop here</p>
                    </label>
                }
                {
                    uploadFiles.map((file,index) => (
                        <div className='relative' key={index}>
                            <FileDisplay file={file}/>
                            <button className='absolute shadow-sm rounded-full shadow-white top-1 right-1 text-shadow text-xl hover:text-gray-500' onClick={()=>handleRemoveFile(file, uploadFiles)}>
                                <AiOutlineClose/>
                            </button>
                        </div>
                    )) 
                }
            </div>
            <p className='text-gray-500'>Accepted File Types: .doc/.docx, .xlsx, .png/.jpg/.jpng, .text</p>
            <div className={`
                transition-opacity
                duration-500
                w-full
                mt-2
                ${!Array.isArray(uploadFiles) || !uploadFiles.length ? 'opacity-0' : 'opacity-100' }
            `}>
                    <FileUpload onFilesUpload={handleFiles}/>
                </div>
        </>
    )
    return (
        <Model 
            isOpen={uploadModel.isOpen}
            onClose={uploadModel.onClose}
            onSubmit={handleSubmit}
            title='Upload'
            body={body}
            actionLabel='Upload'
        />
    )
}

export default UploadModel