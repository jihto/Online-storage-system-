import { get } from '@/helpers/api';
import Cookies from 'js-cookie';
import React from 'react'


const getDeleteFolder = async () => {
    const token = Cookies.get('token');
    try { 
        const response = await get('/folder/isDeleted', 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ); 
        return response.data
    }catch(error: any){
        console.log(error.message);
        return [];
    } 
}
export default getDeleteFolder