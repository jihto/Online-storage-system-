import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';
import { Folder, getFolder, populateFolder } from '@/utils/folderUtils';
import React from 'react'
import { MdHome } from 'react-icons/md'; 
import { DataState, UserProps } from '@/pages';  
import getDeleteFolder from '@/actions/getDeleteFolder';
import { getFolders } from '@/actions/getFolders';

interface BreadcrumbProps{
    setData?: React.Dispatch<React.SetStateAction<DataState>>;
    isDelete?:boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ setData, isDelete = false}) => {
    const breadCrumb = useSetBreadCrumb();

    const handleReturn = async () => {
        const oldId: string = await breadCrumb.removeItem(breadCrumb.idCurrent);
        let getDataFolder: Folder = { files: [], kids: [] };
        if(oldId){
            if(isDelete)
                getDataFolder = await getDeleteFolder();
            else 
                getDataFolder = await getFolder(oldId);
        }else{
            getDataFolder = await getFolders();
        } 
            
        if(Array.isArray(getDataFolder) && getDataFolder.length > 1 && setData)
            setData({kids: getDataFolder, files: []});
        else{
            const dataInFolder = await populateFolder(getDataFolder);  
            if (dataInFolder && setData) 
                setData(dataInFolder); 
        }
    }
    return (
        <div className='bg-default m-1 shadow-xl flex w-fit rounded-full text-white'>
            <div className='flex justify-center gap-2 items-center rounded-l-full py-1 pl-4 pr-5 border-r-2 w-auto'><MdHome/>Home</div>
            {
                breadCrumb.data.map((item, index) => (
                    <button className='py-1 pl-4 pr-5 border-r-2 w-auto' onClick={handleReturn} key={index}>{item.name}</button>
                ))
            } 
        </div>
    )
}

export default Breadcrumb