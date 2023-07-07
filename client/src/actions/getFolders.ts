import { get } from "@/helpers/api";
import Cookies from "js-cookie";

export const getFolders = async (search?: string) => {
    const token = Cookies.get('token');
    try { 
        const response = await get(`/folder/?type=name&value=asc&search=${search || ''}`, 
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