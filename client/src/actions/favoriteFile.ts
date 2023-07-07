import Cookies from "js-cookie";
import api,{ get } from "@/helpers/api";


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
