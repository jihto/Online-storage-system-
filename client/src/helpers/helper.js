import axios from "axios";
import Cookies from "js-cookie";
import { get } from "./api";

const BASE_URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: BASE_URL
})



export const restoreFolder = async (id) => {
    const token = Cookies.get('token');  
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await api.post(`/api/folder/${id}`,null, requestOptions ); 
        return response.data; 
    }catch(error){
        console.log(error.message);
        return error.message;
    } 
}

export const getFolder = async () => { 
    const token = Cookies.get('token'); 
    try{
        const response = await api.get('/api/folder', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.data.json();
        return data; 
    }catch(error){
        console.log(error.message);
        return [];
    } 
} 

export const createFolder = async (name, parent) => {
    const token = Cookies.get('token');  
    try{
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const data = {
            name,
            parent,
        };
        const response = await api.post('/api/folder', data ,requestOptions); 
        return response; 
    }catch(error){
        console.log(error.message);
        return error.message;
    } 
}


export const deleteFolder = async (id) => {
    const token = Cookies.get('token');  
    try{ 
        const response = await api.delete(`/api/folder/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
        return response; 
    }catch(error){
        console.log(error.message);
        return error.message;
    } 
}