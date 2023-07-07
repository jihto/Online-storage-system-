import { create } from "zustand";


interface useUploadModelStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUploadModel = create<useUploadModelStore>((set) => ({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useUploadModel;