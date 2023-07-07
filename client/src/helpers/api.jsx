import axios from 'axios'; 
// import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: 'http://localhost:3333'
}) 

let excludeTokenRequest = []; 

let tokenStore = '';

export const getAPI = async(endpoint) => { 
    try{
        const response = api.get(endpoint,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // if(!response)
        // Promise.reject()
        return (await response).data;
    }catch(error){
        console.log(error.message);
    }  
}

export function setAuthToken(token){
    if (token) {
        tokenStore = token;
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token'); // Remove the token from localStorage
    }
}

export function excludeTokenForRequest(request){
    excludeTokenRequest = request;
}

export function get(endpoint, config={}){ 
    if(excludeTokenRequest.includes(endpoint)){
        return api.get(endpoint, {
            ...config,
            headers: {
                ...config.headers,
                Authorization: '',
            },
        });   
    }
    else{
        return api.get(endpoint, config);
    }
}

export default api;