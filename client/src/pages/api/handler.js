export default async function handler(req, res) { 
    
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
            console.log(data);
            res.status(200).json(data);
        } catch (error) { 
            res.status(500).json({ error: error.message  });
        }
    } 
}