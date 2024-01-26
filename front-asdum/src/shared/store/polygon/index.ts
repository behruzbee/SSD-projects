import create, {SetState} from 'zustand';

import {IPolygonModel} from '@src/shared/models/polygon_model';

export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
interface IPolygon {
    polygons: IPolygonModel[];
    page: number;
    totalCount: number;
    routeName: string;
    routeType: number;
    polygonItem: any;
    fillColor: string;
    openSide: boolean;
    color: IColor;
    polygon: any;
    refetch: number;
    statKpp1: boolean;
    statKpp2: boolean;
    transformToArr: (arg: string) => Array<string>;
    setStatKpp: (payload: boolean, type: 'kpp1' | 'kpp2') => void;
    setRefetch: (payload: number) => void;
    setPolygon: (payload: any) => void;
    setColor: (payload: IColor) => void;
    setOpenSide: (payload: boolean) => void;
    setFillColor: (payload: string) => void;
    handlePolygon: (payload: any) => void;
    setRouteType: (payload: number) => void;
    setRouteName: (payload: string) => void;
    setTotalCount: (payload: number) => void;
    setPage: (payload: number) => void;
    setPolygons: (payload: IPolygonModel[]) => void;
}

export const usePolygonStore = create<IPolygon>((set: SetState<IPolygon>) => ({
    polygons: [],
    page: 1,
    totalCount: 0,
    routeName: '',
    routeType: 2,
    polygonItem: null,
    openSide: false,
    fillColor: 'rgba(37, 36, 36, 0.4)',
    color: {r: 200, g: 150, b: 35, a: 0.5},
    polygon: [],
    refetch: 1,
    statKpp1: false,
    statKpp2: false,
    setStatKpp: (payload, type) => {
        if (type === 'kpp1') {
            set({statKpp1: payload});
        } else {
            set({statKpp2: payload});
        }
    },
    transformToArr: (arg) => {
        if (arg) {
            return arg.split(',');
        } else {
            return [];
        }
    },
    setRefetch: (payload) => set((state) => ({...state, refetch: payload})),
    setPolygon: (payload) => set((state) => ({...state, polygon: payload})),
    setColor: (payload) =>
        set({
            color: payload,
            fillColor: `rgba(${payload.r}, ${payload.g}, ${payload.b}, ${payload.a})`,
        }),
    setOpenSide: (payload) => set((state) => ({...state, openSide: payload})),
    setFillColor: (payload) => set((state) => ({...state, fillColor: payload})),
    handlePolygon: (payload) => {
        console.log();
        set((state) => ({
            polygonItem: payload,
            polygons: state.polygons.filter((item) => item.id === payload.id),
        }));
    },
    setRouteType: (payload) => set({routeType: payload}),
    setRouteName: (payload: string) =>
        set((state) => ({...state, routeName: payload})),
    setTotalCount: (payload: number) =>
        set((state) => ({...state, totalCount: payload})),
    setPage: (payload: number) => set((state) => ({...state, page: payload})),
    setPolygons: (payload): void => {
        set({polygons: payload});
    },
}));
