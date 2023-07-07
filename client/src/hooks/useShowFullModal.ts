import { create } from "zustand";

interface FileOpenProps{
    name: string;
    date: Date;
    type: string;
}

interface ShowFullModalStore{
    id: string;
    url: string;
    name: string;
    isOpen: boolean;
    isFavorited: boolean;
    fileOpen: Array<FileOpenProps>;
    onOpen: (id: string ,url: string, name: string, isFavorited: boolean) => void;
    onClose: () => void;
}

const useShowFullModal = create<ShowFullModalStore>((set) => ({
    name: '',
    url: '',
    isFavorited: false,
    id: '',
    fileOpen: [],
    isOpen: false,
    onOpen: (id: string, url: string, name: string, isFavorited: boolean)=> 
        set((state: ShowFullModalStore)=> ({
            isOpen: true, 
            fileOpen: [{ name, type:url, date: new Date() },...state.fileOpen], 
            id,
            url,
            name,
            isFavorited
        })),
    onClose: ()=> set({isOpen: false})
}))

export default useShowFullModal;