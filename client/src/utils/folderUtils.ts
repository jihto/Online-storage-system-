'use client'

import api,{ get } from '@/helpers/api';  

export interface Folder {
    files: File[];
    kids: Folder[];
  // Other folder properties
}

interface File {
  // File properties
}

async function getFolder(_id: string):Promise<Folder> {
    try { 
        const token = localStorage.getItem('token');
            const response = await get(`folder/${_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const kid = response.data;
        return kid;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to populate folder');
    }
}

async function populateFolder(folder: Folder): Promise<Folder> { 
    try { 
        const token = localStorage.getItem('token');
        let populatedKids: Folder[] = [];
        let populatedFiles: File[] = [];
        if( folder.kids.length > 0){
            populatedKids = await Promise.all(
                folder.kids.map(async (kidId) => {
                    const response = await get(`folder/${kidId}`,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const kid = response.data;
                    return kid;
                })
            );
        }
        if(folder.files.length > 0){
            populatedFiles = await Promise.all(
                folder.files.map(async (fileId) => {
                    const response = await get(`repository/${fileId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const file = response.data;
                    return file;
                })
            );
        }

        // Add the populated files and kids back to the folder object
        const populatedFolder: Folder = { files: populatedFiles, kids: populatedKids };
        return populatedFolder;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to populate folder');
    }
}

export { populateFolder,getFolder };
