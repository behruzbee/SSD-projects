import create, {GetState, SetState} from 'zustand';
import {StoreApiWithPersist, persist} from 'zustand/middleware';

import {VERSION} from '@src/shared/constants';

type IRouteStep = {
    routeId: number;
    setRouteId: (payload: number) => void;
};

export const useRouteStepStore = create<
    IRouteStep,
    SetState<IRouteStep>,
    GetState<IRouteStep>,
    StoreApiWithPersist<IRouteStep>
>(
    persist(
        (set) => ({
            routeId: 0,
            setRouteId: (payload) => {
                set((state) => ({...state, routeId: payload}));
            },
        }),
        {
            name: 'route_step',
            version: VERSION.V1,
        },
    ),
);
