import {StateCreator} from 'zustand';

import {IBulGarage} from '@models/bul_model';

export interface IGarageSlice {
    bulGarages: IBulGarage[];
    garageId: number | null;
    expanded: false | string;
    setBulGarages: (payload: IBulGarage[]) => void;
    setGarageId: (payload: number) => void;
    setExpanded: (payload: string | false) => void;
}

export const createGarageSlice: StateCreator<IGarageSlice> = (set) => ({
    bulGarages: [],
    garageId: null,
    expanded: false,
    setBulGarages: (payload) => {
        set({bulGarages: payload});
    },
    setGarageId: (payload) => {
        set({garageId: payload});
    },
    setExpanded: (payload) => {
        set({expanded: payload});
    },
});
