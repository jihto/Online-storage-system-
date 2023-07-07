import { IconType } from "react-icons";

export type State = 'normal' | 'isDelete' | 'isFavorite';


export type Upload = {
    files: File[];
    idFolder: string;
}


export type Type =  'file' | 'folder' | 'both';


export interface SideBarItemProps{
    name:string;
    icon: IconType;
    url: string;
}
