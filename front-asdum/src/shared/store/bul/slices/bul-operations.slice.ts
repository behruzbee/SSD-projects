import {QueryObserverBaseResult} from 'react-query';
import {StateCreator} from 'zustand';

export interface IBulOperationsSlice {
    refetchBul: (() => Promise<QueryObserverBaseResult>) | null;
    setRefetchBul: (payload: () => Promise<QueryObserverBaseResult>) => void;
}

export const createBulOperationsSlice: StateCreator<IBulOperationsSlice> = (
    set,
) => ({
    refetchBul: null,
    setRefetchBul: (payload) => {
        if (!payload) {
            set({refetchBul: payload});
        }
    },
});
