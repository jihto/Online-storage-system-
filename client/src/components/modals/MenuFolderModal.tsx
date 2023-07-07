import { restoreFolder } from "@/helpers/helper";
import useConfirmModal from "@/hooks/useConfirmModal";
import useMenuFolderModal from "@/hooks/useMenuFolderModal";
import useNewFolderModal from "@/hooks/useNewFolderModal";
import useSetBreadCrumb from "@/hooks/useSetBreadCrumb";
import { State } from "@/type";
import { NextRouter, useRouter } from "next/router";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { IconType } from "react-icons";
import { AiFillDelete, AiOutlineDownload } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineRestore } from "react-icons/md";
import MenuItem from "../sideBar/MenuItem";
import { RouteType } from "next/dist/lib/load-custom-routes";

interface MenuFolderModalProps{ 
    state?: State; 
}

interface MenuProps{
    handle: () => void;
    icon: IconType
    name: string | ReactNode;
}
const MenuFolderModal: React.FC<MenuFolderModalProps> = ({ 
    state = 'normal', 
}) => {
    const useMenuFolder = useMenuFolderModal()
    const newFolder = useNewFolderModal();
    const confirmModal = useConfirmModal();   
    const id: string = useMenuFolder.data.id;
    const name: string = useMenuFolder.data.name;
    const router: NextRouter = useRouter();

    const handleChangeName = () => {
        useMenuFolder.onClose();
        newFolder.changeLabel('Rename Folder');
        newFolder.onOpen(id, name);
    }

    const handleDeleteFolder = () => { 
        useMenuFolder.onClose(); 
        confirmModal.onOpen(id,name);
    }

    const handleRestore = async() => {
        try{ 
            const response = await restoreFolder(id);
            toast.success(response);
            useMenuFolder.onClose();
            router.push(router.asPath);  
        }catch(error: any){
            toast.error(error?.message); 
        }
    }

    let menu:Array<MenuProps> = [];
    if(state === 'isDelete'){
        menu = [
            {name:'Restore',icon:MdOutlineRestore , handle: handleRestore},
            {name:'Delete',icon: AiFillDelete, handle: ()=>{}}
        ];
    } 
    else if(state === 'normal'){
        menu =  [
            {name: 'Rename', icon: BsPencil, handle: handleChangeName },
            {name:  'Delete', icon: MdOutlineDelete, handle: handleDeleteFolder},
            {name: 'Dowload', icon: AiOutlineDownload, handle: handleDeleteFolder}
        ]
    } else{
        return null;
    }
    if(!useMenuFolder.isOpen)
        return null;
    return (
        <div className='absolute z-50 top-8 bg-gray-200 -right-6 grid gap-1 shadow-md p-1 rounded-md w-full'>
            {
                menu.map((item, index)=>(
                    <MenuItem key={index} label={item.name} icon={item.icon} locationIcon='right' onClick={item.handle} />
                ))
            } 
        </div>
    )
}

export default MenuFolderModal;