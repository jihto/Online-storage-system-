'use client';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Breadcrumb from '../Breadcrumb';
import useNewFolderModal from '@/hooks/useNewFolderModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../buttons/Button';
import api from '@/helpers/api';
import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';
import { toast, Toaster } from 'react-hot-toast';
import { createFolder, getFolder } from '@/helpers/helper'; 
import { NextRouter, useRouter } from 'next/router';

interface NewFolderModalProps{

}

interface FormProps{
    name: string;
    parent?: string;
}

const NewFolderModal: React.FC<NewFolderModalProps> = () => {
    const newFolder = useNewFolderModal(); 
    const breadCrumb = useSetBreadCrumb();
    const router: NextRouter = useRouter();
    const { register,handleSubmit, watch, formState: { errors } } = useForm<FieldValues>({ 
        defaultValues: {
            name:newFolder.data.name
        }
    }) 

    const onSubmit:  SubmitHandler<FieldValues> = async(data) =>{
        if(data.name){
            try {
                const dataNewFolder:FormProps = { 
                    name: data.name, 
                    parent: breadCrumb.idCurrent 
                }  
                const response = await createFolder(dataNewFolder);   
                if(!response)
                    toast.error('Fail create')
                toast.success("Create folder successfull");
                newFolder.onClose();
                router.push(router.asPath);
            } catch (error:any) {
                console.log(error?.message);
            }
        }
    } 

    const body = (
        <form className='grid gap-3 text-gray-400' onSubmit={handleSubmit(onSubmit)}>
            { newFolder.label === 'New Folder' && <Breadcrumb />}
            <p>{newFolder.label}: </p>
            <input value={watch('name')} {...register('name')} className='w-3/4 border-2 ml-[12%] outline-default my-4 p-2 rounded-md' placeholder='Name folder...' type="text" />
            <Button label={newFolder.label} type='submit'/>
        </form>
    )


    const handleChangeNameFolder = () => {

    }

    return ( 
        <Modal 
            isOpen={newFolder.isOpen}
            title={newFolder.label}
            onClose={newFolder.onClose}
            body={body} 
        />  
    )
}

export default NewFolderModal