import create from 'zustand';
import {persist} from 'zustand/middleware';

import {VERSION} from '@src/shared/constants';

export interface IEditRoute {
    tab: '1' | '2' | '3' | '4' | '5' | '6';
    setTab: (payload: '1' | '2' | '3' | '4' | '5' | '6') => void;
    routeId: any;
    setRouteId: (payload: any) => void;
}

export const useEditRouteStore = create<IEditRoute>(
    persist(
        (set) => ({
            tab: '1',
            routeId: '',
            setRouteId: (payload: any) => {
                set({routeId: payload});
            },
            setTab: (payload) => {
                set(() => ({tab: payload}));
            },
        }),
        {
            name: 'edit_route',
            version: VERSION.V1,
        },
    ),
);
