import produce from 'immer';
import create, {SetState} from 'zustand';

import {IStation} from '@src/shared/models/station_model';

import {RouteExchangeModel} from '@models/route_exchange_model';

export interface IStations {
    stations: IStation[];
    stationsHistory: RouteExchangeModel[];
    coords: any[];
    polyLines: any[];
    dragLast: any[];
    dragObj: any;
    refetch: number;
    setStationsHistory: (payload: RouteExchangeModel[]) => void;
    setRefetch: (payload: number) => void;
    setDragObj: (payload: any) => void;
    setDragLast: (dragLast: any[]) => void;
    setPolyLines: (payload: any[]) => void;
    setCoords: (payload: any[]) => void;
    setStations: (payload: IStation[]) => void;
    clearSchemeData: () => void;
}

export const useStationsStore = create<IStations>(
    (set: SetState<IStations>) => ({
        stations: [],
        stationsHistory: [],
        polyLines: [],
        coords: [],
        dragLast: [],
        dragObj: {},
        refetch: 0,
        clearSchemeData: () => {
            set({stations: [], coords: []});
        },
        setStationsHistory: (payload) => {
            set({stationsHistory: payload});
        },
        setRefetch: (payload: number) => {
            set((state) => ({...state, refetch: payload}));
        },
        setDragObj: (payload: any) => {
            set(() => ({dragObj: payload}));
        },
        setDragLast: (dragLast: any[]) =>
            set(produce((state) => ({...state, dragLast}))),
        setPolyLines: (payload) =>
            set(produce((state) => ({...state, polyLines: payload}))),
        setCoords: (payload) => set((state) => ({...state, coords: payload})),
        setStations: (payload) => set(produce(() => ({stations: payload}))),
    }),
);
