import React, { memo } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form/dist/types';
import { IconType } from 'react-icons';
import { FaEnvelope } from 'react-icons/fa'; 

interface InputProps{
    id: string;
    label: string;
    type: string;
    value?: string;
    small?: boolean;
    icon?: IconType; 
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    isShow?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    small = false,
    value,
    register, 
    icon: Icon,
    errors,
    isShow = true,
}) => {
    const emailValidation: RegisterOptions = {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address"',
        },
    }
    const passwordValidation: RegisterOptions = {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters *'
        }
    }
    const validation: RegisterOptions = label ==='email' ? emailValidation : passwordValidation;
    
    return (
        <div className={`relative ${isShow ? 'block' : 'hidden'}`}>
            <input
                type={type} 
                value={value}
                placeholder={label}
                {...register(id, validation)}  
                className={`m-3 focus:shadow-3xl
                p-2 rounded-md peer border-2 border-[#90e9f5] outline-[#3cb1c1] placeholder-transparent
                ${ small ? "pl-[8%] w-1/2" : "pl-[15%] w-11/12" }  
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}`}
            />
            <label className={`
                absolute left-4 -top-3.5 text-ouline text-sm transition-all  peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-gray-600 peer-placeholder-shown:text-base 
                ${ small ? "peer-placeholder-shown:left-[10%] " : "peer-placeholder-shown:left-[20%]" } 
                `}>
                {label} 
            </label>
            <div className={`
                absolute top-[35%] text-xl before:w-[2px] before:h-full before:rounded-lg before:absolute before:-right-2 before:bg-[#3cb1c1]
                ${ small ? "left-[5%]" : "left-[10%]" }
            `}>
                { Icon && ( <Icon/> ) } 
            </div>
        </div>
    )
}

export default memo(Input)