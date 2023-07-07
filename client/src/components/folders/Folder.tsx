'use client'; 
import { FcFolder } from 'react-icons/fc'; 
import { HiOutlineFolderAdd } from 'react-icons/hi';
import useNewFolderModal from '@/hooks/useNewFolderModal';
import MenuFolderModal from '../modals/MenuFolderModal'; 
import { populateFolder } from '@/utils/folderUtils'; 
import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';
import React, { useState }  from "react";
import { IconType } from 'react-icons';
import useMenuFolderModal from '@/hooks/useMenuFolderModal';
import { State } from '@/type';
import { DataState } from '@/pages';

 
interface FolderProps{
    folder?: any;
    isCreate?: boolean;
    state?: State;
    setData?: React.Dispatch<React.SetStateAction<DataState>>;
    icon?: IconType;  
}

const Folder:React.ForwardRefRenderFunction<unknown, FolderProps> = ({
    isCreate = false, 
    folder,
    setData,
    state = 'normal', 
    icon: Icon,
},ref) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const newFolder = useNewFolderModal();  
    const breadCrumb = useSetBreadCrumb();
    const useMenuFolder = useMenuFolderModal()
    const handleAddNew = async () =>{
        useMenuFolder.onClose(); 
        newFolder.changeLabel('New Folder');
        newFolder.onOpen();
    }  
    const handleShowFolder = async () =>{ 
        try {  
            const dataInFolder = await populateFolder(folder); 
            if (dataInFolder && setData) { 
                breadCrumb.addItem(folder.name, folder._id);
                setData(dataInFolder);
            }
        } catch (error) {
            console.error(error);  
        }  
    }
    const handleShowMenu = () => { 
        if(useMenuFolder.isOpen)
            useMenuFolder.onClose();
        else {
            if(state === 'isFavorite')
                setIsFavorite(prev => !prev)
            else
                useMenuFolder.onOpen(folder._id, folder.name, state)
        }
    }
    return (
        < div
            className={`relative grid justify-center items-center transition-all duration-700 bg-white w-full rounded-3xl m-1 border-base border-gray-200 hover:shadow-xl
        `}>
            {isCreate
                ? <button onClick={handleAddNew}>
                    <HiOutlineFolderAdd className={`w-full text-gray-500`} size={150}/>
                    New folder  
                </button>
                : <>
                    {folder && 
                        <div className='relative w-full'>
                            { folder._id === useMenuFolder.data.id && <MenuFolderModal state={state}  /> }
                            <button className='absolute top-3 -right-0 font-bold hover:scale-105' onClick={handleShowMenu}>
                                { Icon 
                                    ? <Icon 
                                            className={`${isFavorite ? 'text-red-600': 'text-black'}`} 
                                            size={20} 
                                        />
                                    : null
                                } 
                            </button>
                        </div>
                    }
                    <button onClick={handleShowFolder}>
                        <FcFolder size={150}/>
                    </button>
                    <p className='text-center'>{folder?.name}</p>
                </>
            } 
        </div>
    )
}


export default Folder;