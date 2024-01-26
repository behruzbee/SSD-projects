import {DateRange} from 'react-day-picker';
import create, {GetState, SetState} from 'zustand';

import {IGraphic} from '@models/graph_model';
import {
    RouteExchangeModel,
    RouteExchangeOrder,
    monthlyRouteExchangeModel,
} from '@models/route_exchange_model';
import {SelectOptions} from '@models/select_options_model';
import {sortArray} from '@shared/helpers';
import {arrOfSelectObjects} from '@shared/helpers/toSelectFormat';

interface IOrder {
    expanded: string | false;
    routeId: number;
    fetchCount: number;
    monthlyFetchCount: number;
    orders: RouteExchangeModel[];
    monthlyOrders: monthlyRouteExchangeModel[];
    monthlyOrderTotalCount: number;
    monthlyOrderPage: number;
    orderHistory: RouteExchangeModel[];
    selectedOrder: RouteExchangeModel | null;
    selectedMonthlyOrder: monthlyRouteExchangeModel | null;
    openM: boolean;
    openS: boolean;
    date: Date | undefined;
    orderGarages: RouteExchangeOrder[];
    monthlyOrderGarages: RouteExchangeOrder[];
    refetch: number;
    graphId: number | string | null;
    graphic: IGraphic[];
    selectedRange: DateRange | undefined;
    editSelectedRange: DateRange | undefined;
    orderMode: string;
    openMonthlyM: boolean;
    openEditMonthlyM: boolean;
    monthlyGraphNumbers: SelectOptions[];
    stationsList: SelectOptions[];
    graphList: SelectOptions<{label: number; value: number}>[];
    parkId: number | null;
    setParkId: (id: number) => void;
    isGraphExist: (val: number | null) => boolean;
    setStationsList: (data: Array<{name: string; id: number}>) => void;
    setGraphList: (payload: Array<number>) => void;
    setMonthlyOrderPage: (payload: number) => void;
    setMonthlyOrderTotalCount: (payload: number) => void;
    setOpenMonthlyM: (payload: boolean) => void;
    setOpenEditMonthlyM: (payload: boolean) => void;
    setOrderMode: (payload: string) => void;
    setSelectedRange: (payload: DateRange | undefined) => void;
    setEditSelectedRange: (payload: DateRange | undefined) => void;
    setGraphic: (payload: IGraphic[]) => void;
    setGraphId: (payload: number | string | null) => void;
    setRefetch: (payload: number) => void;
    setOrderGarages: (
        payload: RouteExchangeOrder[],
        type: 'daily' | 'monthly',
    ) => void;
    setDate: (payload: Date) => void;
    setOpenS: (payload: boolean) => void;
    closeModal: () => void;
    setOpenM: (payload: boolean) => void;
    setMOrder: (payload: monthlyRouteExchangeModel | null) => void;
    setOrder: (payload: RouteExchangeModel) => void;
    setMonthlyOrder: (payload: monthlyRouteExchangeModel[]) => void;
    setOrderHistory: (payload: RouteExchangeModel[]) => void;
    setOrders: (payload: RouteExchangeModel[]) => void;
    setFetchUp: (payload: number) => void;
    setMonthlyFetchUp: (payload: number) => void;
    setRouteId: (payload: number) => void;
    setExpanded: (payload: string | false) => void;
    setMonthlyGraphNumbers: (payload: Array<number>) => void;
    sortByField: <T, K extends keyof T>(data: T[], field: K) => T[];
}

interface IHistoryOrder {
    dailyOrderHistory: RouteExchangeModel[];
    monthlyOrderHistory: RouteExchangeModel[];
    size: number;
    dailyOrderPage: number;
    monthlyOrderPage: number;
    dailyOrderTotalCount: number;
    monthlyOrderTotalCount: number;
    setOrderHistoryData: (type: string, payload: RouteExchangeModel[]) => void;
    setOrderHistoryPage: (type: string, payload: number) => void;
    setOrderHistoryTotalCount: (type: string, payload: number) => void;
}

export const useOrderStore = create<IOrder>(
    (set: SetState<IOrder>, get: GetState<IOrder>) => ({
        expanded: false,
        routeId: NaN,
        fetchCount: 0,
        monthlyFetchCount: 0,
        orders: [],
        monthlyOrders: [],
        orderHistory: [],
        selectedOrder: null,
        selectedMonthlyOrder: null,
        openM: false,
        openS: false,
        date: new Date(),
        orderGarages: [],
        monthlyOrderGarages: [],
        refetch: 0,
        graphId: null,
        graphic: [],
        selectedRange: {from: undefined, to: undefined},
        editSelectedRange: {from: undefined, to: undefined},
        orderMode: '',
        openMonthlyM: false,
        monthlyGraphNumbers: [],
        monthlyOrderPage: 1,
        monthlyOrderTotalCount: 0,
        openEditMonthlyM: false,
        graphList: [],
        stationsList: [],
        parkId: null,
        setParkId: (parkId) => {
            set({parkId});
        },
        isGraphExist: (val) => {
            //@ts-ignore
            return !!get().graphList.filter((graph) => graph.value == val)
                .length;
        },
        setStationsList: (list) => {
            const stationsList = list.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            set({stationsList});
        },
        setGraphList: (payload) => {
            const list = payload.map((value) => ({
                value,
                label: value,
            }));
            set({graphList: list as Array<any>});
        },
        setMOrder(payload) {
            set({selectedMonthlyOrder: payload});
        },
        setMonthlyOrderPage: (payload) => {
            set({monthlyOrderPage: payload});
        },
        setMonthlyOrderTotalCount: (payload) => {
            set({monthlyOrderTotalCount: payload});
        },
        setOpenMonthlyM: (payload) => {
            set({openMonthlyM: payload});
        },
        setOpenEditMonthlyM: (payload) => {
            set({openEditMonthlyM: payload});
        },
        setOrderMode: (payload) => {
            set({orderMode: payload});
        },
        setSelectedRange: (payload) => {
            set({selectedRange: payload});
        },
        setEditSelectedRange: (payload) => {
            set({editSelectedRange: payload});
        },
        setGraphic: (payload) => {
            set({graphic: payload});
        },
        setGraphId: (payload: number | string) => {
            console.log('Set graph id');

            set({graphId: payload});
        },
        setRefetch: (payload: number) => {
            set((state) => ({...state, refetch: payload}));
        },
        setOrderGarages: (payload, type) => {
            if (type === 'daily') {
                set({orderGarages: payload});
            } else {
                set({monthlyOrderGarages: payload});
            }
        },
        setDate: (payload) => set((state) => ({...state, date: payload})),
        setOpenS: (payload) => set({openS: payload}),
        setOpenM: (payload) => set({openM: payload}),
        closeModal: () => set({openM: false}),
        setOrder: (payload) => {
            set({selectedOrder: payload});
        },
        setMonthlyOrder: (payload) => {
            set({monthlyOrders: get().sortByField(payload, 'graph_id')});
        },
        setOrderHistory: (payload) => {
            set({orderHistory: payload});
        },
        setOrders: (payload) => set({orders: sortArray(payload, 'graph_id')}),
        setFetchUp: (payload) =>
            set((state) => ({...state, fetchCount: payload})),
        setMonthlyFetchUp: (payload) =>
            set((state) => ({...state, monthlyFetchCount: payload})),
        setRouteId: (payload: number) =>
            set((state) => ({...state, routeId: payload})),
        setExpanded: (payload) => {
            set(() => ({expanded: payload}));
        },
        setMonthlyGraphNumbers: (payload) => {
            set({monthlyGraphNumbers: arrOfSelectObjects(payload)});
        },
        sortByField: <K extends keyof T, T extends Record<K, T[K]>>(
            payload: T[],
            field: K,
        ) => {
            const arr: T[] = payload.sort(
                (prev: T, next: T) => prev[field] - next[field],
            );
            return arr;
        },
    }),
);

export const useOrderHistoryStore = create<IHistoryOrder>(
    (set: SetState<IHistoryOrder>) => ({
        dailyOrderHistory: [],
        monthlyOrderHistory: [],
        dailyOrderPage: 1,
        monthlyOrderPage: 1,
        dailyOrderTotalCount: 0,
        monthlyOrderTotalCount: 0,
        size: 10,
        setOrderHistoryPage: (type, payload) => {
            if (type === 'daily') {
                set({dailyOrderPage: payload});
            } else {
                set({monthlyOrderPage: payload});
            }
        },
        setOrderHistoryTotalCount: (type, payload) => {
            if (type === 'daily') {
                set({dailyOrderTotalCount: payload});
            } else {
                set({monthlyOrderTotalCount: payload});
            }
        },
        setOrderHistoryData: (type, payload) => {
            const data = payload.sort((a, b) =>
                a.graph_id && b.graph_id ? a.graph_id - b.graph_id : -1,
            );

            if (type === 'daily') {
                set({dailyOrderHistory: data});
            } else {
                set({monthlyOrderHistory: data});
            }
        },
    }),
);
