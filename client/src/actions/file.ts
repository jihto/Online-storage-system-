
import api,{ get } from "@/helpers/api";
import { Upload } from "@/type"; 
import Cookies from "js-cookie"

export const uploadFile = async(formData: FormData) =>{
    const token = Cookies.get('token');
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            },
        }; 
        const response = await api.post('/repository/create', formData ,requestOptions); 
        console.log(response);
        return response.data.json(); 
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}


export const getFiles = async (search: string) => {
    const token = Cookies.get('token');
    try { 
        const response = await get(`/repository/?type=originalname&value=asc&search=${search}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ); 
        return response.data
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}


export const deleteFile = async() =>{
    const token = Cookies.get('token');

    
}


export const favoriteFile = async(id: string) =>{
    const token = Cookies.get('token');
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }; 
        const response = await api.put(`/repository/favorite/${id}`, [], requestOptions); 
        console.log(response);
        return response.data; 
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}

export const unFavoriteFile = async(id: string) =>{
    const token = Cookies.get('token');
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }; 
        const response = await api.put(`/repository/unfavorite/${id}`, [] ,requestOptions); 
        console.log(response);
        return response.data; 
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}
