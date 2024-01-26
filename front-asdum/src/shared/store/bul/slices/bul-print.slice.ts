import {RefObject} from 'react';
import {StateCreator} from 'zustand';

export interface IBulPrintSlice {
    printElemRef: RefObject<HTMLElement> | null;
    setPrintElemRef: (payload: RefObject<HTMLElement>) => void;
}

export const createBulPrintSlice: StateCreator<IBulPrintSlice> = (set) => ({
    printElemRef: null,
    setPrintElemRef: (payload) => {
        set({printElemRef: payload});
    },
});
