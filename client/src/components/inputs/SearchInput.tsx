'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'
import { HiOutlineSearch, HiUserCircle } from 'react-icons/hi';
import ButtonRound from '../buttons/ButtonRound';
import { FiFilter } from 'react-icons/fi'; 
import CheckBoxInput from './CheckBoxInput';
import useSearchStore from '@/hooks/useSearchStore';
import { Type } from '@/type';

interface SearchInputProps{ 
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onSubmitSearch: ((content: string, type: Type) => void | undefined);
}

interface TypeChecked{
    file: boolean;
    folder: boolean;
}

const SearchInput:React.FC<SearchInputProps> = ({
    search,
    setSearch,
    onSubmitSearch,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    const useSearch = useSearchStore();
    const [storeType, setStoreType] = useState<TypeChecked>({
        file: false, 
        folder: false
    });
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setSearch(event.target.value.toLowerCase())
    } 
    return (
        <div className='flex justify-center max-h-full gap-3 relative'> 
            <button 
                className='
                    absolute left-4 top-5 
                    border-r-base 
                    px-1
                    hover:opacity-60
                '
                onClick={()=> setIsOpen(!isOpen)}
            >
                <FiFilter size={20}/>
            </button>
            <MenuFilter type={storeType}setType={setStoreType} isOpen={isOpen}/>
            <input 
            onChange={handleSearch}
            value={search}
                placeholder='Search...' 
                className={`
                    m-1
                    pl-12
                    py-3
                    outline-none 
                    rounded-full 
                    shadow-md 
                    shadow-gray-500
                    w-full 
                `}/>
            <button 
                className='
                    rounded-full 
                    p-1
                    absolute right-3 top-2 
                    hover:opacity-50
                ' 
                onClick={() => onSubmitSearch(search, useSearch.type)}
            > 
                    <HiOutlineSearch size={30}/>
            </button> 
        </div>        
    )
}

interface MenuFilterProps{
    isOpen: boolean; 
    type: TypeChecked;
    setType: React.Dispatch<React.SetStateAction<TypeChecked>>;
}

const MenuFilter: React.FC<MenuFilterProps> = ({isOpen, type, setType}) => {
    if(!isOpen)
        return null;
    return (
        <div className='absolute z-50 bg-white left-0 top-12 shadow-lg rounded-lg'>
            <CheckBoxInput id="folder" label='folder'/>
            <CheckBoxInput id="file" label='file' /> 
        </div>
    )
}

export default SearchInput