import {StateCreator} from 'zustand';

import {IFuelType} from '@models/fuel_type_model';
import {SelectOptions} from '@models/select_options_model';

export interface IFuelSlice {
    fuelOptions: Array<SelectOptions<number>>;
    fuelTypeList: IFuelType[];
    setFuelOptions: (payload: Array<IFuelType>) => void;
    setFuelTypeList: (payload: IFuelType[]) => void;
    selectedFuelType: IFuelType[];
    setSelectedFuelType: (payload: IFuelType[]) => void;
}

export const createFuelSlice: StateCreator<IFuelSlice> = (set, get) => ({
    fuelTypeList: [],
    selectedFuelType: [],
    fuelOptions: [],
    setFuelOptions: (payload) => {
        const options: Array<SelectOptions<number>> = payload.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        set({fuelOptions: options});
    },
    setSelectedFuelType: (payload: IFuelType[]) => {
        set({selectedFuelType: payload});
    },
    setFuelTypeList: (payload: IFuelType[]) => {
        set({fuelTypeList: payload});
        get().setFuelOptions(payload);
    },
});
