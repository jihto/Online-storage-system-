'use client';

import React, { useState } from 'react'
import MenuItem from './MenuItem'
import { FaHome,FaShareAlt, FaTrashAlt, FaSave, FaSignOutAlt } from 'react-icons/fa';
import Avatar from '../Avatar'; 
import UserMenu from './UserMenu';
import { RiSearchLine } from 'react-icons/ri';
import { GiFalconMoon } from 'react-icons/gi';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import ChangeTheme from '../ChangeTheme';
import { FiFilter } from 'react-icons/fi';
import ButtonRound from '../buttons/ButtonRound';
import SearchInput from '../inputs/SearchInput';
import { CurrentUser } from '@/type/user';

interface NavbarProps{
  currentUser: CurrentUser;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  if(!currentUser)
    return null;  

  return (
    <div 
      className='   
        grid grid-cols-2  
        w-full h-14
        md:right-[10%] md:w-4/5  
        lg:w-3/5 lg:right-[5%] 
        xl:w-1/12 xl:right-[5%] 
        bg-default z-20 rounded-full 
      '
    > 
      <UserMenu currentUser={currentUser}/>
    </div>
  )
}

export default Navbar