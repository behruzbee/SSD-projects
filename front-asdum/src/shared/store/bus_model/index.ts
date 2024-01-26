import create from 'zustand';

import {IBusModelJSON} from '@src/shared/models/bus_model';

import {IFuelSlice, createFuelSlice} from '@store/bus_model/slices/fuel.slice';

interface IBusModel {
    busModels: IBusModelJSON[];
    totalBusModelCount: number;
    refetch: number;
    setRefetch: () => void;
    setTotalBusModelCount: (payload: number) => void;
    setBusModelsList: (payload: IBusModelJSON[]) => void;
    page: number;
    setPage: (payload: number) => void;
    term: string;
    setSearchTerm: (payload: string) => void;
}

type BusModelType = IBusModel & IFuelSlice;

export const useBusModelStore = create<BusModelType>((set, get, api) => ({
    busModels: [],
    totalBusModelCount: 0,
    page: 1,
    term: '',
    refetch: 1,
    setRefetch: () => {
        set((state) => ({refetch: state.refetch + 1}));
    },
    setTotalBusModelCount: (payload: number) => {
        set({totalBusModelCount: payload});
    },
    setSearchTerm: (payload: string) => {
        set({term: payload});
    },
    setPage: (payload: number) => {
        set({page: payload});
    },
    setBusModelsList: (payload): void => {
        set({busModels: payload});
    },
    ...createFuelSlice(set, get, api),
}));
