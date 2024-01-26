import produce from 'immer';
import create from 'zustand';

import {IStation} from '@src/shared/models/station_model';

interface IStationsList {
    stationsList: IStation[];
    station: IStation;
    isEditable: boolean;
    zoomCoords: number[];
    routes: string[];
    draggableStation: IStation;
    setDraggableStation: (station: IStation) => void;
    setStation: (station: IStation) => void;
    setRoutes: (routes: string[]) => void;
    setZoomCoords: (coords: number[]) => void;
    setEditable: (value: boolean) => void;
    editStation: (payload: IStation) => void;
    addNewStation: (payload: IStation) => void;
    removeStation: (payload: number) => void;
    setStationsList: (payload: IStation[]) => void;
}

export const useStationsListStore = create<IStationsList>((set) => ({
    stationsList: [],
    station: {} as IStation,
    isEditable: false,
    zoomCoords: [],
    routes: [],
    draggableStation: {} as IStation,
    setDraggableStation: (station) => set({draggableStation: station}),
    setStation: (station) => set({station}),
    setRoutes: (routes) => set({routes}),
    setZoomCoords: (zoomCoords) => set({zoomCoords}),
    setEditable: (isEditable) => set({isEditable}),
    editStation: (payload) =>
        set(
            produce((draft: IStationsList) => {
                const idx = draft.stationsList.findIndex(
                    (item) => item.id === payload.id,
                );
                draft.stationsList[idx] = payload;
            }),
        ),
    addNewStation: (payload) =>
        set(
            produce((draft: IStationsList) => {
                draft.stationsList.push(payload);
            }),
        ),
    removeStation: (id) =>
        set(
            produce((draft: IStationsList) => {
                const idx = draft.stationsList.findIndex(
                    (item) => item.id === id,
                );
                draft.stationsList.splice(idx, 1);
            }),
        ),
    setStationsList: (stationsList) => set(produce(() => ({stationsList}))),
}));
