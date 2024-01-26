import create, {SetState} from 'zustand';

interface IHeader {
    openMenu: HTMLElement | null;
    setOpenMenu: (payload: any) => void;
    openOnline: HTMLElement | null;
    setOpenOnline: (payload: any) => void;
}

export const useHeaderStore = create<IHeader>((set: SetState<IHeader>) => ({
    openMenu: null,
    setOpenMenu: (payload): void => {
        set({openMenu: payload});
    },
    openOnline: null,
    setOpenOnline: (payload): void => {
        set({openOnline: payload});
    },
}));
