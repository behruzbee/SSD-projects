import create from 'zustand';

interface IMain {
    open: boolean;
    openSide: boolean;
    openUpdate: boolean;
    handleOpenUpdate: (payload: boolean) => void;
    setOpenSide: (payload: boolean) => void;
    handleTap: (payload: boolean) => void;
}

export const useMainStore = create<IMain>((set) => ({
    open: false,
    openSide: false,
    openUpdate: false,
    handleOpenUpdate: (openUpdate) => set({openUpdate}),
    setOpenSide: (openSide) => set({openSide}),
    handleTap: (open) => set({open}),
}));
