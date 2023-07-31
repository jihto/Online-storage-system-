'use client';

import React, { useEffect, useState } from 'react'
import Model from './Modal'
import useUserModel from '@/hooks/useUserModel'
import Avatar from '../Avatar';
import Box from '../Box';
import { BsFiletypeDoc, BsFillImageFill } from 'react-icons/bs'
import { RiFileExcel2Line } from 'react-icons/ri';
import { MdOutlineFolder, MdOutlineMarkEmailRead, MdPassword } from 'react-icons/md';
import Input from '../inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { getCurrentUser } from '@/actions/getDataUser';
import Heading from '../Heading';
import { useRouter } from 'next/router'; 
import dateFormat from 'dateformat';
import Image from 'next/image';
import AvatarUser from '/public/images/avatar.png';
import Button from '../buttons/Button';
import { toast } from 'react-hot-toast';
import { updateAvatarUser } from '@/actions/user';


interface UserModalProps{
    currentUser?: any;
}
const UserModal: React.FC<UserModalProps> = ({currentUser}) => {   
    const userModel = useUserModel(); 
    const [menuUser, setMenuUser] = useState(0);
    const router = useRouter(); 
    const handleChange = () =>{
        userModel.onClose();
        router.push('/settings')
    }
    const title = (
        <div className='flex items-center gap-3'>
            <Avatar src={currentUser.avatar && `http://127.0.0.1:3333/uploads/avatars/${currentUser.avatar}`}/>
            <p>{currentUser?.username}</p>
        </div>
    ) 
    const manageFile = (
        <div className={`transition duration-1000 ${ menuUser === 0 ? 'opacity-100' : 'opacity-0' }`}>
            <div className='flex w-full flex-row justify-center gap-2 py-5 border-b-2 rounded-lg shadow-lg'>
                <div className='flex flex-wrap w-1/2 justify-center border-r-2 gap-5 px-3'>
                    <p className='text-xl'>File</p>
                    <Box locationContent='row' content={`${currentUser?.files} files`} icon={MdOutlineFolder}/>
                </div>
                <div className='flex flex-wrap w-1/2 justify-center gap-5 border-l-2 px-3'>
                    <p className='text-xl'>Folder</p>
                    <Box locationContent='row' content={`${currentUser?.folders} folders`} icon={MdOutlineFolder}/>
                </div>     
            </div>
            <div className='w-full shadow-lg p-4 rounded-lg'>
                <div className='flex flex-row gap-5 rounded-xl'>
                    <p className='text-xl flex justify-center'>Type</p>
                    <div className='flex gap-3'>
                        <Box color='bg-[#5d9cfb]' content="Doc" icon={BsFiletypeDoc} />
                        <Box color='bg-[#028d00]' content="Excel" icon={RiFileExcel2Line} />
                        <Box color='bg-[gray]' content="Image" icon={BsFillImageFill} /> 
                    </div>
                </div>
            </div>
        </div>
    )   
    const information = (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 shadow-xl rounded-lg p-4 transition duration-1000 ${ menuUser === 1 ? 'opacity-100' : 'opacity-0' }`}>
            <div className='border-r-base items-center grid gap-5 justify-center'>
                <Image 
                    src={`http://127.0.0.1:3333/uploads/avatars/${currentUser.avatar}`} 
                    width={300} 
                    height={300} 
                    alt={'avatar'}
                    className='rounded-xl shadow-md max-h-[500px] object-cover'
                /> 
            </div>
            <div className='text-gray-600 grid gap-4 mt-2'>
                <Heading title={`Account of user:`}  />
                <p><strong>Name: </strong>{currentUser.username}</p>
                <p><strong>Email: </strong>{currentUser.auth?.email}</p>
                <p><strong>Create at Date:</strong> {dateFormat(currentUser.createAt, "mmmm dS, yyyy")}</p>
                <p><strong>Update last time:</strong> {dateFormat(currentUser.updateAt, "mmmm dS, yyyy")}</p>
                <p><strong>Roles: </strong>{currentUser.role}</p>
            </div>
        </div>
    )
    const footer = (
        <div className='w-full rounded-lg shadow-lg overflow-x-hidden'> 
            <div className='flex justify-between w-3/5 mx-[20%] my-5 '>
                <button onClick={()=>setMenuUser(0)} className=''>Manage File</button>
                <button onClick={()=>setMenuUser(1)} className=''>Information</button> 
            </div>
            <div className={`
                relative w-full after:absolute after:bottom-2 after:w-2/4 after:h-1 after:bg-gray-500 after:rounded-full after:transitionn after:duration-1000
                ${ menuUser === 0 ? 'after:translate-x-0' : 'after:translate-x-full' }
            `}></div>
        </div>
    )
    return ( 
        <Model 
            isOpen={userModel.isOpen}
            onClose={userModel.onClose}
            title={title}
            body={menuUser === 0 ? manageFile : information} 
            actionLabel={menuUser === 1 ? 'Go to settings' : null}
            onSubmit={handleChange}
            footer={footer}
        />    
    )
}

export default UserModal;