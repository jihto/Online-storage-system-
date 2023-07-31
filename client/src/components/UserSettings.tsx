'use client'

import Image from 'next/image';
import React, { Children, ReactElement } from 'react'
import DefaultAvatar from 'public/images/avatar.png';
import ButtonRound from './buttons/ButtonRound';
import { FaPen, FaUserAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import SearchInput from './inputs/SearchInput';
import NestedLayout from './NestedLayout';
import SideBar from './sideBar/SideBar'; 
import useNewFolderModal from '@/hooks/useNewFolderModal';
import useUserModel from '@/hooks/useUserModel';
import { ListMenu } from '@/contants';
import ConfirmModal from './modals/ConfirmModal';
import Container from './Container';

interface UserSettingsProps{
    children: ReactElement;
} 

const UserSettings:React.FC<UserSettingsProps> = ({children}) => { 
    return ( 
        <div className='grid justify-between gap-5 grid-cols-[3fr,1fr] w-full p-5'>
            <ConfirmModal 
                title="Delete Folder"
                actionLabel='Delete' 
                warning={true}
            /> 
            {/* Account */} 
            <div className='flex justify-start items-center gap-5'>
                <Image className='rounded-full border-base' src={DefaultAvatar} width={50} height={50} alt='avatar'/>
                <div>
                    <p className='font-bold'>Name</p>
                    <p className='text-gray-500 text-sm'>Date Log up</p>
                </div>
            </div>
            <div className='flex gap-2 justify-end'> 
            </div> 
            <p className='text-5xl font-bold mb-14'>Settings</p>  
            <div></div>
            {/* Settings */} 
            <div className='border-base shadow-lg rounded-xl'>
                {children}
            </div>
            <SideBar isMain={false} outline={false} listMenu={ListMenu}/> 
        </div>   
    )
}

export default UserSettings;