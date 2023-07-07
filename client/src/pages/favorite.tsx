import React, { useEffect, useState } from 'react' 
import { NextPageWithLayout } from './_app'
import { DataState, getLayout, UserProps } from '.'
import Folders from '@/components/folders/Folders' 
import Container from '@/components/Container';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import Breadcrumb from '@/components/Breadcrumb' 
import { parseCookies } from 'nookies';
import { get } from '@/helpers/api';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps<UserProps> = async (context) => {
    const cookies = parseCookies(context); 
    const token = cookies.token;
    try {   
        const response = await get(`/repository/isFavorited`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const folders = response.data;  
        return {
            props: {
                folders, 
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                folders: [],
            },
        };
    }
} 
const Favorite: NextPageWithLayout<UserProps> = ({folders}) => {
    console.log(folders);
    const [data, setData] = useState<DataState>({files: [], kids: []}); 
    
    useEffect(() => { 
        setData({ kids:[], files: folders });
    },[]);
    return ( 
        <Container>
            <p className='text-5xl font-bold mb-14'>Favorite</p>
            <Breadcrumb/>
            <Folders  
                data={data}
                setData={setData}
                icon={MdOutlineFavoriteBorder}
                state='isFavorite'    
            /> 
        </Container> 
    )
}

Favorite.getLayout = getLayout;

export default Favorite; 
