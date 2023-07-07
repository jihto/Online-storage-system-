'use client';
import React from 'react'
import SideBar from './sideBar/SideBar'
import { getListMenu } from '@/contants'; 
interface NestedLayoutProps{
  children: React.ReactNode;
}

const NestedLayout:  React.FC<NestedLayoutProps> = ({children}) => {
  const listsMenu = getListMenu();
  return (
    <div className={`grid grid-cols-[1fr,5fr] bg-[rgba(236,236,240,1)]`}>
      <SideBar listMenu={listsMenu}/>
      <div className='shadow-md bg-white border-base max-h-full'>
        {children}
      </div>   
    </div>
  )
}


export default NestedLayout;