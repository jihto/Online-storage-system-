import { create } from "zustand";

interface DataState{
    id: string;
    name: string;
    state: State;
}

type State = 'normal' | 'isDelete' | 'isFavorite';

interface useMenuFileModalStore{
    isOpen: boolean;
    data: DataState;
    onOpen: (id: string, name: string, state: State) => void;
    onClose: () => void;
}

const useMenuFileModal = create<useMenuFileModalStore>((set) => ({
    isOpen: false,
    data: { id: '', name: '', state:'normal' },
    onOpen: (id: string, name: string, state: State)=> set({isOpen: true, data:{ id, name , state }}),
    onClose: ()=> set({isOpen: false})
}))

export default useMenuFileModal;