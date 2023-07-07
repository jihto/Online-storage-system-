'use client';
import React, { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from '../_app'
import UserSettings from '@/components/UserSettings';
import Container from '@/components/Container';
import Layout from '@/Layout';
import NestedLayout from '@/components/NestedLayout';
import ConfirmModal from '@/components/modals/ConfirmModal';
import Image from 'next/image';

import defautAvatar from '/public/images/avatar.png';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import { NextRouter, useRouter } from 'next/router';
import { getCurrentUser } from '@/actions/getDataUser';
import { toast } from 'react-hot-toast';
import { updateAvatarUser } from '@/actions/user';
import dateFormat from 'dateformat';


const settings: NextPageWithLayout = () => { 
    const [currentUser, setCurrentUser] = useState<null | any>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File| null>(null);
    const router: NextRouter = useRouter()
    const {register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            username: currentUser?.username
        }
    }); 
    useEffect(()=>{ 
        getCurrentUser()
            .then(data => setCurrentUser(data))
            .catch(error => router.replace('/auth'));
    },[]);  
    const handleUploadAvatar = async() => {
        try {
            if(avatar){
                const formData = new FormData();
                formData.append("avatar", avatar);
                console.log(avatar);
                const response = await updateAvatarUser(formData);
                if(!response)
                    toast.error(response.message)
                toast.success("upload");
                router.reload()
            }
        } catch (error) {
            toast.error("Update Fail");
        }
        setUrl(null);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file){
            if(file.name.includes('.jpg')){
                toast.success("Upload avatar success");
                setUrl(URL.createObjectURL(file));
                setAvatar(file);
            }
            else    
                toast.error("You need to provide image")
        }
    } 
    return (
            <div className='grid grid-cols-2 justify-between'>
            <div className='items-center grid gap-5 justify-center'>
                <Image 
                    src={url ? url : `http://127.0.0.1:3333/uploads/avatars/${currentUser?.avatar}`} 
                    width={300} 
                    height={300} 
                    alt={'avatar'}
                    className='rounded-xl shadow-md w-full max-h-[500px] object-cover'
                />
                {
                    url 
                        ? <Button type='button' label="Change" onClick={handleUploadAvatar}/>
                        : <Button type='button' label={<label htmlFor='avatar'>Upload</label>} />
                }
                <input type="file" id='avatar' onChange={handleImageUpload} className='hidden'/>
            </div>
            <Container> 
                <div className='grid gap-5 items-center w-full'>
                    <p className='text-gray-500 text-xl'>Information user: </p> 
                        <Input type='text' id="username" label='Name...' register={register} errors={errors} />
                    <p>Email: {currentUser?.auth?.email}</p> 
                    <p>Create at day: {dateFormat(currentUser?.createAt, "mmmm dS, yyyy")}</p>
                    <p>Last update at: {dateFormat(currentUser?.updateAt, "mmmm dS, yyyy")}</p> 
                    <Button type='button' label="Change" onClick={()=>{}}/>
                </div>
            </Container>
        </div>
    )
} 

export const getLayoutSettings = (page: ReactElement) => {
    return (
        <Layout>
            <NestedLayout> 
                <UserSettings>{page}</UserSettings>   
            </NestedLayout>
        </Layout>
    )
}

settings.getLayout = getLayoutSettings;

export default settings