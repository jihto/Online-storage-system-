import { create } from "zustand";

interface DataProps {
  _id: string;
  name: string;
}

interface UseBreadCrumbStore {
    data: DataProps[];
    idCurrent: string;
    addItem: (name: string, _id: string) => void;
    removeItem: (_id: string) => string;
    clearItem: () => void;
}

const useSetBreadCrumb = create<UseBreadCrumbStore>((set) => ({
    data: [],
    idCurrent: "",
    addItem: (name: string, _id: string) =>
        set((state: UseBreadCrumbStore) => ({ data: [...state.data, { _id, name }], idCurrent: _id })),
    removeItem: (_id: string) => {
        let updatedIdCurrent: string = _id;
        set((state: UseBreadCrumbStore) => {
            const updatedData = state.data.filter((item) => item._id !== _id);
            updatedIdCurrent =
                state.idCurrent === _id
                ? updatedData[updatedData.length - 1]?._id || ""
                : state.idCurrent;
            return { data: updatedData, idCurrent: updatedIdCurrent };
        });
        return updatedIdCurrent;
    },
    clearItem: () => set(() => ({ data: [], idCurrent: "" })),
}));

export default useSetBreadCrumb;
