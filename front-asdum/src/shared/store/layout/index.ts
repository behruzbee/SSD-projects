import produce from 'immer';
import create, {SetState} from 'zustand';

interface ILayout {
    open: boolean;
    handleTap: (payload: boolean) => void;
}

export const useLayoutStore = create<ILayout>((set: SetState<ILayout>) => ({
    open: true,
    handleTap: (payload): void => {
        set(produce(() => ({open: payload})));
    },
}));
