import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { MdAlternateEmail, MdWbSunny } from 'react-icons/md';
import { RiLockPasswordLine, RiLockUnlockLine } from 'react-icons/ri';
import { FaBoxOpen } from 'react-icons/fa';
import { BsFillCloudsFill, BsFillCloudHaze2Fill, BsFacebook, BsGithub } from 'react-icons/bs';
import { FieldErrors } from 'react-hook-form'; 
import { TbTruck } from 'react-icons/tb' 
import { social_networks } from '@/contants';
import Heading from './Heading';
import { signIn } from 'next-auth/react';

interface IconProps{ 
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean; 
    isSignIn:  boolean;
    errors: FieldErrors
}
 
const titleSignIn = 
    <Heading  
        title='Wellcome back!'
        subTitle='Fill up personal information and start journey with us.'
        center
    />;
const titleSignUp = 
    <Heading 
        title='Hello Friend!' 
        subTitle='Everything you need to manage, store, flexible to share your file, in one place '
        center
    />; 

const LogupAnother: React.ForwardRefRenderFunction<unknown, IconProps> = ({ 
    email, 
    password, 
    confirmPassword, 
    isSignIn, 
    errors 
}, ref) => {
    const [show, setShow] = useState(false);
    const [delay, setDelay] = useState(false);  

    useImperativeHandle(ref, ()=>({
        signUp: ()=>{  
            setShow(prev=>!prev);
            setTimeout(()=>{
                setDelay(prev=>!prev);
            },2000); 
        }
    }))   
    return (
        <>  
            <div className='relative w-full h-[25%] lg:h-1/3'>  
                <div className='absolute z-10 w-1/2 text-7xl animate-moving top-16'>
                    <BsFillCloudsFill/>
                </div>
                <div className='absolute z-10 w-1/2 text-7xl animate-moving-slow top-20'>
                    <BsFillCloudHaze2Fill/>
                </div>
                <div className='text-5xl z-0 absolute right-10 top-10 animate-spin-slow'>
                    <MdWbSunny/>
                </div> 
            </div> 
            <div className='grid justify-items-center lg:my-[10%] content-center'>
                { isSignIn ? titleSignIn : titleSignUp }
            </div> 
            {
                isSignIn 
                ? <div className='relative after:absolute lg:pb-0 pb-32 after:bottom-1/2 lg:after:bottom-0 after:w-full after:h-1 after:bg-black'>  
                    <div className={`relative ml-[5%] w-full lg:pt-32 rounded-full flex justify-center`}>
                        <div className={`absolute top-6 lg:top-2/3 left-0 text-4xl ml-10 transition duration-[1000ms] translate-x-0 ${show && 'animate-quiver translate-x-8'}  ${delay && 'hidden'}`}>
                            <FaBoxOpen/>
                        </div>
                        <div className={`absolute top-[50%] w-3/4 left-[20%] text-7xl transition duration-[5000ms] ${delay ? 'translate-x-[62%]' : ''}`}>
                            <TbTruck/>
                        </div>
                        <div className={`
                            absolute -top-16 left-10 text-2xl rounded-full bg-white p-2 transition-all opacity-0 
                            ${email && !show ? '-top-2 opacity-100' : 'top-16'}
                            ${errors.email ? 'text-red-600 animate-quiver' : 'text-green-400'}
                        `}>
                            <MdAlternateEmail/>
                        </div>

                        <div className={`
                            absolute -top-16 transition-all text-2xl rounded-full bg-white p-2 opacity-0 
                            ${password && !show ? 'top-6 left-24 opacity-100' : 'top-16 left-8'}
                            ${ errors.password ? 'text-red-600 animate-quiver' : 'text-green-400'} 
                        `}>
                            <RiLockPasswordLine/>
                        </div>

                        <div className={`
                            absolute -top-16 transition-all text-2xl rounded-full bg-white p-2 opacity-0 
                            ${confirmPassword && !show ? 'top-6 -left-4 opacity-100' : 'top-16 left-8'}
                            ${ errors.confirmPassword ? 'text-red-600 animate-quiver' : 'text-green-400'} 
                        `}>
                            <RiLockUnlockLine/>
                        </div>
                    </div>
                </div>  
                : <div className='grid justify-center w-full'>
                    <hr className='bg-default h-1 w-full rounded-lg'/>
                    <p className='font-bold font-serif my-10 lg:my-10'>Login using social networks</p> 
                    <div className='flex justify-between'>
                        {
                            social_networks.map((item, index) => (
                                <button 
                                    key={index}
                                    onClick={()=>signIn()}
                                    className={`border-1 hover:opacity-75 hover:scale-110 text-2xl p-2 bg-white rounded-full ${item.color}`}
                                >
                                    {item.name}
                                </button>
                            ))
                        }
                    </div>
                    <div className='relative w-4/5 lg:before:relative before:absolute before:left-[10%] before:mt-2 before:rounded-lg before:w-full before:h-1 before:bg-gray-500'></div>
                </div>     
            }
        </>
    )
}

export default memo(forwardRef<unknown, IconProps>(LogupAnother))