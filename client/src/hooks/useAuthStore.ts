import create from 'zustand';

interface AuthStore {
    token: string;
    setToken: (token: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    token: '',
    setToken: (token: string) => set({ token }),
}));

export const setAuthToken = (token: string) => {
    useAuthStore.getState().setToken(token);
};

export default useAuthStore;