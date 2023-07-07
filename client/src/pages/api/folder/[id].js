import api from '@/helpers/api'; 


export default async function handler(req, res) {
    const authorizationHeader = req.headers.authorization;  
    if (!authorizationHeader) {
        // Handle the case where the Authorization header is missing
        res.status(401).json({ error: 'Authorization header is missing.' });
        return;
    } 
    const [authType, token] = authorizationHeader.split(' ');  
    
    const { id } = req.query; 
    if (req.method === 'GET') {
        try { 
            const response = await api.get(`http://localhost:3333/folder/${id}`);
            const folder = await response.data; 
            res.status(200).json(folder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch folder' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { name } = req.body; 
            const updatedUser = { id, name };
        
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    } else if (req.method === 'POST') {
        try {   
            const response = await api.post(`/folder/restore/${id}`,null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.status(200).json(response.data.message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    } 
    
    else if (req.method === 'DELETE') {
        try { 
            const response = await api.delete(`/folder/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.status(200).json({ message: 'Folder deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete folder' });
        }
    } else {
        res.setHeader('Allow', ['GET',,"POST", 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
