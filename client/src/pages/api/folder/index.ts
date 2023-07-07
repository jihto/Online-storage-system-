'use client';
import { parseCookies } from 'nookies';
import api, { get, getAPI } from '@/helpers/api'; 
import { NextApiRequest, NextApiResponse } from 'next';


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
            // Perform the API request with the bearer token in the headers
            const response = await api.get('/folder',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data; 
            res.status(200).json(data);
        } catch (error: any) { 
            res.status(500).json({ error: error.message  });
        }
    } else if(req.method === 'POST'){
        try { 
            const { name } = req.body; 
            const requestOptions = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            let data = null;
            if(name.parent)
                data= {
                    name: name.name,
                    parent: name.parent,
                };   
            else
                data= { name: name.name };   
            const response = await api.post('/folder/create', data, requestOptions);
            res.status(200).json(data); 
        } catch (error: any) { 
            res.status(500).json({ error: error.message  });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}