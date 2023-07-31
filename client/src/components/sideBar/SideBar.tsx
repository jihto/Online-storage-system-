'use client';
import React, { ReactNode, useEffect, useState } from 'react'
import MenuItem from './MenuItem';
import { useRouter } from 'next/router';
import UserMenu from './UserMenu';
import Heading from '../Heading';
import { GiFalconMoon } from 'react-icons/gi';
import Container from '../Container';
import ChangeTheme from '../ChangeTheme';
import { SideBarItemProps } from '@/type';
import { getCurrentUser } from '@/actions/user';

interface ListMenu {
    label: string;
    lists: SideBarItemProps[]; 
}

interface SideBarProps{
    isMain?: boolean;
    outline?: boolean;
    listMenu?: Array<ListMenu>;
}

const SideBar: React.FC<SideBarProps> = ({ isMain = true, outline = true, listMenu }) => {
    let currentPage:number = -1; 
    const [currentUser, setCurrentUser] = useState<null | any>(null);
    const router = useRouter(); 
    useEffect(()=>{ 
        getCurrentUser()
            .then(data => setCurrentUser(data))
            .catch(error => {console.log(error.message); 
        router.replace('/auth')});
    },[router]);

    const hanldeChangePage = (route: string) => { 
        router.push(route); 
    }
 
    return ( 
        <aside className={`
                w-full z-0 relative max-h-full
                ${outline ? 'bg-gray-200 shadow-xl' : 'bg-white'}
            `}>
            {
                isMain 
                    ? <div className='text-lg text-default mx-[20%] my-10 flex justify-between'>
                        <div>
                            <GiFalconMoon size={40}/>
                            Logo
                        </div> 
                    </div>
                    : null
            } 
                
            {/* Of User  */}     
            <Container>
                {listMenu?.map((item, index) => (
                    <div key={index} className={`grid gap-4 relative`}>  
                        <p className='text-gray-800 font-bold font-serif'>{item.label}</p> 
                            {
                                item.lists.map((list,indexList) => {
                                    currentPage++;
                                    return list ?
                                        <MenuItem 
                                            key={indexList}   
                                            outline={outline} 
                                            label={list.name} 
                                            icon={list.icon}  
                                            onClick={()=>router.push(list.url)} 
                                            // isChoose={isMain ? window.location.pathname === list.url : false}
                                        />
                                        :null
                                }
                            )} 
                        <div className='w-full my-3 h-[1px] rounded-full -top-2 bg-default'></div>
                    </div>
                ))}  
            </Container>
            <footer className='mt-32 mb-16 ml-0'>
                { isMain && currentUser  && <UserMenu currentUser={currentUser}/> }   
            </footer>
        </aside> 
    )
}

export default SideBar