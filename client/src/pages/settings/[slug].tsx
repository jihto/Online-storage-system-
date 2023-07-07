import React, { ReactElement, useEffect, useState } from 'react' 
import { NextPageWithLayout } from '../_app';
import { NextRouter, useRouter } from 'next/router';
import Layout from '@/Layout';
import NestedLayout from '@/components/NestedLayout';
import UserSettings from '@/components/UserSettings';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import { MdMarkEmailRead, MdOutlineMarkEmailRead, MdPassword } from 'react-icons/md';
import { HiOutlineMailOpen } from 'react-icons/hi';
import Button from '@/components/buttons/Button';
import { getCurrentUser } from '@/actions/getDataUser';
import { updateAvatarUser } from '@/actions/user';
import { toast } from 'react-hot-toast';
import Image from 'next/image'; 
import dateFormat from 'dateformat';
 
const Profile:NextPageWithLayout = () => {
    const [currentUser, setCurrentUser] = useState<null | any>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File| null>(null);
    const router: NextRouter = useRouter() 
    useEffect(()=>{ 
        getCurrentUser()
            .then(data => setCurrentUser(data))
            .catch(error => router.replace('/auth'));
    },[]);  
    const handleUploadAvatar = async() => {
        try {
            if(avatar){
                const formData = new FormData();
                formData.append("avatar", avatar);
                const response = await updateAvatarUser(formData);
                if(!response)
                    toast.error(response.message)
                toast.success("upload");
                router.reload()
            }
        } catch (error) {
            toast.error("Update Fail");
        }
        setUrl(null);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file){
            if(file.name.includes('.jpg')){
                toast.success("Upload avatar success");
                setUrl(URL.createObjectURL(file));
                setAvatar(file);
            }
            else    
                toast.error("You need to provide image")
        }
    }  
    const { slug } = router.query;
    const {register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
            confirmPassword: '',
            username: currentUser?.username
        }
    }); 
    if(slug === 'change_email')
        return ( 
                <form className='flex text-center items-center mt-[8%] content-center'>
                    <Container>
                        <Heading 
                            title='Change Email:'
                            subTitle='To change email you need to provide current email and password!!'
                        />
                        <div className='my-5'></div>
                        <Input type='email' icon={HiOutlineMailOpen} id="Email" label='Email Current...' register={register} errors={errors} />
                        <Input type='email' icon={MdOutlineMarkEmailRead} id="New Email" label='New Email...' register={register} errors={errors} />
                        <Input type='password' icon={MdPassword} id="New Email" label='Password...' register={register} errors={errors} />
                        <Button type='submit' label="Change" onClick={()=>{}}/>
                    </Container>
                </form> 
        )
    else if(slug === 'change_password')
        return (
            <form className='flex text-center items-center mt-[8%] content-center'>
                <Container>
                    <Heading 
                        title='Change Password:'
                        subTitle='We will send role to update password in your email'
                    />
                    <div className='my-5 text-center'>Please, provide your current email!!</div>
                    <Input type='email' icon={HiOutlineMailOpen} id="Email" label='Email Current...' register={register} errors={errors} />
                    <Button type='submit' label="Send" onClick={()=>{}}/>
                </Container>
            </form>
        )
    else 
        return (
            <div className='grid grid-cols-2 justify-between mt-[8%]'>
                <div className='items-center grid gap-5 justify-center'>
                    <Image 
                        src={url ? url : `http://127.0.0.1:3333/uploads/avatars/${currentUser?.avatar}`} 
                        width={300} 
                        height={300} 
                        alt={'avatar'}
                        className='rounded-xl shadow-md w-full max-h-[500px] object-cover'
                    />
                    {
                        url 
                            ? <Button type='button' label="Change" onClick={handleUploadAvatar}/>
                            : <Button type='button' label={<label htmlFor='avatar'>Upload</label>} />
                    }
                    <input type="file" id='avatar' onChange={handleImageUpload} className='hidden'/>
                </div>
                <Container> 
                    <div className='grid gap-5 items-center w-full'>
                        <p className='text-gray-500 text-xl'>Information user: </p> 
                            <Input type='text' id="username" label='Name...' register={register} errors={errors} />
                        <p>Email: {currentUser?.auth?.email}</p> 
                        <p>Create at day: {dateFormat(currentUser?.createAt, "mmmm dS, yyyy")}</p>
                        <p>Last update at: {dateFormat(currentUser?.updateAt, "mmmm dS, yyyy")}</p> 
                        <Button type='button' label="Change" onClick={()=>{}}/>
                    </div>
                </Container>
            </div>
        )
} 
export const getLayoutSettings = (page: ReactElement) => {
    return (
        <Layout>
            <NestedLayout> 
                <UserSettings>{page}</UserSettings>   
            </NestedLayout>
        </Layout>
    )
}

Profile.getLayout = getLayoutSettings;

export default Profile