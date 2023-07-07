import api from "@/helpers/api";
import { Upload } from "@/type";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {  
    const authorizationHeader = req.headers.authorization;  
    if (!authorizationHeader) {
        // Handle the case where the Authorization header is missing
        res.status(401).json({ error: 'Authorization header is missing.' });
        return;
    } 
    const [authType, token] = authorizationHeader.split(' ');  
    
    if (req.method === 'GET') {
        try { 
            
            res.status(200).json('data');
        } catch (error: any) { 
            res.status(500).json({ error: error.message  });
        }
    } else if(req.method === 'POST'){
        try { 
            const requestOptions = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { formData } = req.body;  

            const response = await api.post('/repository/create', formData, requestOptions);
            console.log(response.data);
            res.status(200).json(response.data); 
        } catch (error: any) { 
            res.status(500).json({ error: error.message  });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}