'use client';

import React, { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import Avatar from '../Avatar';
import { HiMenu, HiUserCircle } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import useUserModel from '@/hooks/useUserModel'; 
import Cookies from 'js-cookie';
import { NextRouter, useRouter } from 'next/router'; 
import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';
import { CurrentUser } from '@/type/user';
import { GiFalconMoon } from 'react-icons/gi';
import Heading from '../Heading';

interface UserMenuProps{
    currentUser: CurrentUser;
}

const UserMenu:React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userModel = useUserModel();
    const router: NextRouter = useRouter();
    const breadCrumb = useSetBreadCrumb();
    
    const toggleShow =  useCallback(() => {
        userModel.onOpen();
        setIsOpen(false);
    },[])
    const toggleLogOut = () => {
        Cookies.remove('token');
        breadCrumb.clearItem();
        router.replace('/auth');
    }
    return (
        <>
            <div className='grid justify-items-center items-center w-full h-20'>
                <MenuItem 
                    locationIcon='right'
                    label={
                        <div className='flex justify-between items-center gap-1'> 
                            <Avatar 
                                size='large'
                                src={`http://127.0.0.1:3333/uploads/avatars/${currentUser?.avatar}`}
                            /> 
                            <Heading center={false} size='small' title={currentUser?.username} subTitle={currentUser?.auth?.email}/>
                        </div>
                    }  
                    icon={HiMenu} 
                    onClick={()=>setIsOpen(prev => !prev)}
                /> 
            </div>
            {
                isOpen ? (
                <>
                    <div className='absolute bottom-[12%] right-8 rotate-45 shadow-xl shadow-gray-900 w-4 h-4 bg-gray-200'></div>
                    <div className='absolute grid gap-1 p-1 rounded-xl w-full md:w-3/5 shadow-xl bg-gray-300 bottom-[13%] right-0 overflow-hidden'>
                        <MenuItem label="Profile" icon={HiUserCircle} locationIcon='right' onClick={toggleShow} />
                        <MenuItem label="Log Out" icon={FiLogOut} locationIcon='right' onClick={toggleLogOut} />
                    </div>
                </>
                ) : null
            } 
        </>
    )
}

export default UserMenu