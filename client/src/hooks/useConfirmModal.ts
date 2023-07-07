import { create } from "zustand";

interface DataProps{
    name: string | undefined;
    id: string;
}

interface useConfirmModalStore{
    isOpen: boolean;
    data: DataProps;
    onOpen: (id: string, name: string | undefined) => void;
    onClose: () => void;
}

const useConfirmModal = create<useConfirmModalStore>((set) => ({
    isOpen: false,
    data: { name :'', id:'' },
    onOpen: (id: string, name: string| undefined)=> set({isOpen: true, data:{
        name,
        id
    }}),
    onClose: ()=> set({isOpen: false})
}))

export default useConfirmModal;