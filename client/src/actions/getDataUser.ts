import api from "@/helpers/api";
import Cookies from "js-cookie";

export const getCurrentUser = async() => {
    const token = Cookies.get('token');
    try{ 
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,  
            },
        }; 
        const response = await api.get('/user',requestOptions);  
        return response.data; 
    }catch(error: any){
        console.log(error.message);
        return error.message;
    } 
}