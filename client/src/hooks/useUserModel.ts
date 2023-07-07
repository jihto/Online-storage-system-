import { create } from "zustand";


interface UserModelStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUserModel = create<UserModelStore>((set) => ({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useUserModel;