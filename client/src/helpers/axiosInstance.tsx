
// import api from './api';

// export default api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZTAzYjFjYmFkMTFlYmFlYjUwNDYiLCJ1c2VybmFtZSI6IkppaHRvIiwicm9sZXMiOiJ1c2VyIiwiZW1haWwiOiJodXlwaHVjMkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ2ODQxNTcsImV4cCI6MTY4NDY4NTk1N30.h4OnHirG5Hui941V3OsUDMSbkohJObNfPMkl_VHAAoI'
//     if(token) 
//         config.headers.Authorization = `Bearer ${token}`;
//     return config;
// },(error)=>{
//     return Promise.reject(er)
// }) 