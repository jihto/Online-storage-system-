import Cookies from "js-cookie";
import api,{ get } from "@/helpers/api";

export const updateAvatarUser = async(formData: FormData) =>{ 
    const token = Cookies.get('token');
    try { 
        const response = await api.put('/users/updateAvatar', formData
,            {
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

export const updateInformationOfUser = async(formData: FormData) => {
    const token = Cookies.get('token');
    try { 
        const response = await api.put('/users/updateInformation', formData
,            {
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

export const getCurrentUser = async() => {
    const token = Cookies.get('token');
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,  
            },
        }; 
        const response = await api.get('/users',requestOptions);  
        return response.data; 
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}