import useSearchStore from '@/hooks/useSearchStore';
import { Type } from '@/type';
import React, { ChangeEvent } from 'react'

interface CheckBoxInputProps{
    id: string;
    label: Type; 
    checked?: boolean;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
    id, 
    label, 
    checked = false,
}) => {
    const useSearch = useSearchStore();
    const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked:boolean = event.target.checked; 
        isChecked
            ? useSearch.onTypeSearch(label)
            : useSearch.onRemoveTypeSearch();
    }
    return ( 
        <label  
            className='
                text-gray-500 
                grid grid-cols-2 
                mx-4
                my-2 
            ' 
        >
            <input  
                checked = {checked}
                type='checkbox' 
                id={id}
                className='default:ring-2 m-[2px]'
                onChange={handleChecked}
            />
            {label}
        </label> 
    )
}

export default CheckBoxInput