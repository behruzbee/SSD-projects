import create, {SetState} from 'zustand';

import {RouteModel} from '@src/shared/models/route_model';

export interface IRoute {
    total: number;
    page: number;
    routes: RouteModel[];
    selectedRoute: RouteModel | null;
    text: string;
    openHistory: HTMLElement | null;
    openSide: boolean;
    setOpenSide: (openSide: boolean) => void;
    setOpenHistory: (openHistory: any) => void;
    setText: (text: string) => void;
    setSelectedRoute: (selectedRoute: RouteModel | null) => void;
    setRoutes: (routes: RouteModel[]) => void;
    setPage: (page: number) => void;
    setTotal: (total: number) => void;
}

export const useRouteStore = create<IRoute>((set: SetState<IRoute>, get) => ({
    total: 0,
    page: 1,
    routes: [],
    selectedRoute: null,
    text: '',
    openHistory: null,
    openSide: false,
    setOpenSide: (openSide: boolean) => set((state) => ({...state, openSide})),
    setOpenHistory: (openHistory) => set({openHistory}),
    setText: (text: string) => set((state) => ({...state, text})),
    setSelectedRoute: (selectedRoute: RouteModel) => {
        if (get().selectedRoute?.route_id !== selectedRoute?.route_id) {
            set((state) => ({...state, selectedRoute}));
        }
    },
    setRoutes: (routes: RouteModel[]) => set((state) => ({...state, routes})),
    setPage: (page: number) => set((state) => ({...state, page})),
    setTotal: (total) => set((state) => ({...state, total})),
}));
