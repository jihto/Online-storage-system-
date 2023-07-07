'use client';
import React, { useEffect, useState } from 'react' 
import { NextPageWithLayout } from './_app'
import { DataState, UserProps, getLayout } from '.'
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { get } from '@/helpers/api';
import Folders from '@/components/folders/Folders';
import { BsTrash } from 'react-icons/bs';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';
import { toast } from 'react-hot-toast'; 
import getDeleteFolder from '@/actions/getDeleteFolder';

    
const useStrash: NextPageWithLayout<UserProps> = () => { 
    
    const [data, setData] = useState<DataState>({files: [], kids: []}); 
    
    useEffect(() => { 
        getDeleteFolder()
            .then(folders => setData({ files:[], kids: folders }))
            .catch(err => console.log(err));
    },[]);
    return (
        <Container>
            <p className='text-5xl font-bold mb-14'>Strash</p>
            <Breadcrumb />
            <Folders 
                state = 'isDelete'
                data={data}  
                setData={setData}
                icon={BsTrash}
            />
        </Container> 
    )
}

useStrash.getLayout = getLayout;

export default useStrash
