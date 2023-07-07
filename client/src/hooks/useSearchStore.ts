import { Type } from "@/type";
import { create } from "zustand";


interface useSearchStoreProps{
    type: Type;  
    onTypeSearch: (type: Type) => void;
    onRemoveTypeSearch: () => void;
}

const useSearchStore = create<useSearchStoreProps>((set) => ({
    type: 'both',  
    onTypeSearch: (type: Type)=> set({type}),
    onRemoveTypeSearch: () => set({type: 'both'}), 
}))

export default useSearchStore;