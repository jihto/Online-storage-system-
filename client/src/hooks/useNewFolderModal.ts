import { create } from "zustand";

interface MyObject {
    id?: string;
    name?: string;
}

interface useNewFolderModalStore{
    isOpen: boolean;
    data: MyObject;
    label: string;
    changeLabel: (label: string) => void; 
    onOpen: (id?: string, name?: string) => void;
    onClose: () => void;
}

const useNewFolderModal = create<useNewFolderModalStore>((set) => ({
    isOpen: false,
    data: { id: '', name: '' },
    label: 'Create Folder',
    changeLabel: (label)=>set({label}), 
    onOpen: (id?: string, name?: string)=> set({isOpen: true, data:{ id, name }}),
    onClose: ()=> set({isOpen: false})
}))

export default useNewFolderModal;