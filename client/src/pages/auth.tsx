'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import BackgroundAuth from '../components/BackgroundAuth';
import Input from '../components/inputs/Input';
import { FaEnvelope } from 'react-icons/fa';
import { MdOutlinePassword, MdOutlineArrowBackIosNew} from 'react-icons/md'
import {  BsSendFill} from 'react-icons/bs';
import { GiFalconMoon } from 'react-icons/gi'
import { FieldError, FieldErrors, FieldValues, SubmitHandler, UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import Button from '@/components/buttons/Button';
import ImageForget from 'public/images/forget_pass.png';
import Image from 'next/image';
import ChangeTheme from '@/components/ChangeTheme';
import api, { setAuthToken } from '../helpers/api'; 
import { NextRouter, useRouter } from 'next/router';
import { toast,Toaster } from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { setCookie } from 'nookies'; 
import Heading from '@/components/Heading';
interface LoginResponse{
  message: string;
  accessToken: string;  
}

const Auth:NextPage = () => {  
  const [isSignUp, setIsSignUp] = useState<boolean>(false);   
  const [isForget, setIsForget] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const btnRef = useRef<{ signUp: () => void } | null>(null);  
  const {register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues:{
      email: '',
      password: '',
      confirmPassword: '',
    }
  }); 
  
  //function to reset Form 
  const resetForm: UseFormSetValue<FieldValues> = (name, value) => {
    setValue(name, value); 
  };
  
  const onSubmit: SubmitHandler<FieldValues> = async data => {   
    setIsLoading(true); 
    //Send email to reset password
    if(data.email && !data.password && !data.confirmPassword)  
      console.log({email:data.email})

    //Login User  
    if(data.email && data.password && !data.confirmPassword){ 
      try {
        const dataSignIn: Object = {
          username:data.email, 
          password: data.password
        }
        
        const response: AxiosResponse<LoginResponse> = await api.post('/auth/signin',dataSignIn); 
        if(response.data){
          setIsLoading(false);
          const token: string = response.data?.accessToken; 
          Cookies.set('token', token); 
          localStorage.setItem('token',token);
          setAuthToken(token);
          toast.success('Login Successfull!',{duration: 3000});
          router.push('/');
        } 
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // Display the server error message on the screen 
          toast.error(error.response.data.message);
        } else if (error.request) {
          // The request was made, but no response was received
          toast.error('No response received from the server');
        } else {
          // Something happened in setting up the request
          toast.error(`Error: ${error.message}`);
        }
      }
    }
    //Sign Up User
    if(data.confirmPassword){ 
      if(btnRef.current !== null)
        btnRef.current.signUp();
      try {
        const dataSignUp: Object = {
          email:data.email, 
          password: data.password
        }
        const response: AxiosResponse<LoginResponse> = await api.post('/auth/signup', dataSignUp); 
        if(response.data){
          setIsLoading(false); 
          toast.success('Log Up Successfull!',{duration: 3000});
          resetForm('email', data.email);
          resetForm('password', data.password);
          setIsSignUp(false);
        } 
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // Display the server error message on the screen 
          toast.error(error.response.data.message);
        } else if (error.request) {
          // The request was made, but no response was received
          toast.error('No response received from the server');
        } else {
          // Something happened in setting up the request
          toast.error(`Error: Login fail`);
        }
      }
    } 
  }; 
  
  //Checking errors of input form using RegisterOptions in react-form
  const renderErrorMessage = (error: string | FieldError | undefined): ReactNode => {
    if (typeof error === 'string') 
      return <span> {error} </span>;
    if (error?.message)
      return <span> {error.message} </span>;
    return <span> *</span>;
  }; 
  return (
    <div> 
      <div className={`relative grid bg-[rgb(255,255,255,0.5)] shadow-2xl rounded-xl ${isForget ? '' :'lg:grid-cols-[1fr,1fr]'} my-[5%] mx-[8%] lg:mx-[20%] lg:mt-[8%] mb-[100%]`}>
        {/** User interface animation  */}
        <div className={`
          lg:absolute lg:top-0 lg:left-0 lg:w-1/2 transition-all duration-1000 ease-in-out h-full border-l-2 
          ${isSignUp ? 'lg:translate-x-full' : 'translate-x-0'} 
          ${isForget ? 'hidden' : 'block' }
        `}>
          <BackgroundAuth  
            email={watch('email')}
            password={watch('password')}
            confirmPassword={watch('confirmPassword')} 
            isSignIn={!isSignUp ? false : true}
            ref={btnRef}
            errors={errors}
          />
        </div>    

        {/**User interface forget password */}
        <div className={`mx-[12.5%] my-[5%]  
          ${isForget ? 'h-full' : 'h-0'}
          transition-all duration-1000 ease-in-out overflow-hidden
        `}>
          <div className='grid justify-items-center gap-10'>
            <Image className='' src={ImageForget} width={200} height={200} alt='Forget Password'/>
            <p className='text-xl lg:text-2xl font-medium'>Yo! Forget Your Password?</p>
            <p className='text-gray-500 text-base'>Dont worries! Enter your email and we will send you a reset.</p>
          </div>
          <Input id='email' label='Email...' type='email' icon={FaEnvelope} register={register} errors={errors}/> 
          <div className='flex justify-between'>
            <Button 
              label='Return'
              type='button'
              onClick={()=>setIsForget(prev=>!prev)}
              icon={MdOutlineArrowBackIosNew}
            />
            <Button 
              label='Send request'
              type='submit'
              onClick={handleSubmit(onSubmit)} 
              icon={BsSendFill}
            />
          </div> 
        </div>   
        
        {/** User interface Login and sign up*/} 
        <form className={`
            grid transition-all duration-1000 ease-in-out z-10 border-l-2 w-full px-[5%] lg:px-[15%] gap-4
            ${isSignUp ? 'lg:-translate-x-[100%]' : 'translate-x-0'}  
            ${isForget ? 'hidden' : 'block' } 
          `}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex mt-10 text-lg text-default'>
            <GiFalconMoon/>
            Logo
          </div> 
          { isSignUp 
            ? <Heading title='Sign Up' subTitle='Register with email' center={false} size='large'/> 
            : <Heading title='Sign In' subTitle='Use your email account' center={false} size='large'/>
          } 
          <Input id="email" label='Email...' type='email' icon={FaEnvelope} register={register} errors={errors}/>
          <Input id="password" label='Password...' type='password' icon={MdOutlinePassword} register={register} errors={errors}/>
          { isSignUp && <Input id="confirmPassword" label='Confirm Password...' type='password' icon={MdOutlinePassword} register={register} errors={errors} isShow={isSignUp}/>}
          <div className='flex justify-between mx-3 mb-4 mt-2'>
            <div className='flex'>
              <input className='mr-2 scale-150 text-xs lg:text-base  accent-default rounded-sm checked:shadow-xl' type='checkbox'/><p>Remember me</p>
            </div>
            <p className='underline text-sm lg:text-base underline-offset-2 cursor-pointer' onClick={()=>setIsForget(prev => !prev)}>Forgot Password?</p>
          </div> 
          <div>
            <p className={`my-2 text-pink-600 text-sm transition-opacity ${ errors.email || errors.password ? 'opacity-100' : 'opacity-0'}`}>
              {renderErrorMessage(errors.email as string | FieldError)}
              {renderErrorMessage(errors.password as string | FieldError)}
            </p>   
            <Button
              label={!isSignUp ? 'Sign In' : 'Sign Up'}
              type='submit' 
              disabled={isLoading}
            /> 
          </div> 
          <Toaster />
          <p className='m-3'>{!isSignUp ? 'Don\'t have an account? ' : 'You have an account '}<a onClick={()=> setIsSignUp(prev => !prev)} className='text-[#28d2e9] cursor-pointer'>Sign up</a></p>
        </form>
      </div> 
    </div>
  )
}

export default Auth;