'use client';
import React from 'react'
import type { NextPageWithLayout } from './_app'
import { getLayout } from '.';
import Container from '@/components/Container';
import Input from '@/components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { MdDriveFileRenameOutline, MdEmail, MdLocationPin, MdWifiCalling1 } from 'react-icons/md';
import { AiFillFacebook, AiFillGithub, AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import Heading from '@/components/Heading';
import { toast } from 'react-hot-toast';
const Contact: NextPageWithLayout = () => {
    const { register, formState:{ errors }} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            message: ''
        }
    })
    return ( 
        <div className='flex justify-center items-center h-full'>
            <Container> 
                <div className='grid gap-6 item text-center'>
                    <p className='text-5xl w-full border-dashed border-b-2 border-default pb-10'>CONTACT</p>
                    <Heading 
                        title={'We\'d to help!'} 
                        subTitle={'We like  to create things with fun, open-minnded people. Feel free to say hello for everyone'}
                        center={true}
                    />
                </div>
                <div className='grid grid-cols-2 justify-center gap-10 mt-10'>
                    <div>
                        <Input id='name' icon={MdDriveFileRenameOutline} label='Name...' type='text' register={register} errors={errors}/>
                        <Input id='email' icon={AiOutlineMail} label='Email...' type='email' register={register} errors={errors}/>
                        <textarea className='w-[91%] h-24 rounded-md m-3 p-2 border-2 border-gray-300 outline-default focus:shadow-3xl' placeholder='Message...'></textarea>
                        <div className='border-4 w-4/5 ml-[8%] mb-2 border-default rounded-full'></div>
                        <div className='w-1/2 ml-[25%]'>
                            <Button type='submit' label='Send' onClick={()=>toast.success("Send request!!")}/>
                        </div>
                    </div> 
                        <table className='w-full text-lg'>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Contact with us!</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><MdLocationPin size={25}/></td>
                                    <td>BinhThanh, Ho Chi Minh City</td>
                                </tr>
                                <tr>
                                    <td><MdWifiCalling1 size={25}/></td>
                                    <td>(+84) 994123570</td>
                                </tr>
                                <tr className='border-b-2 border-spacing-1 border-default'>
                                    <td><MdEmail size={25}/></td>
                                    <td>nhhphuc1311@gmail.com</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} className='flex mt-4 justify-center'>
                                        <Link href=''><AiFillFacebook className='text-blue-600' size={40}/></Link> 
                                        <Link href=''><AiOutlineInstagram size={40}/></Link>  
                                        <Link href=''><AiFillGithub size={40}/></Link>  
                                    </th>
                                </tr>
                            </tbody>
                        </table> 
                </div> 
            </Container> 
        </div>
    )
}
Contact.getLayout = getLayout;
export default Contact