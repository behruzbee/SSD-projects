import create, {SetState} from 'zustand';

interface ICheck {
    isOnline: boolean;
    setIsOnline: (payload: boolean) => void;
}

export const checkInternetStore = create<ICheck>((set: SetState<ICheck>) => ({
    isOnline: true,
    setIsOnline: (payload) => {
        set({isOnline: payload});
    },
}));
