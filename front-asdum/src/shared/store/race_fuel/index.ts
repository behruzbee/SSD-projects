import produce from 'immer';
import create from 'zustand';

import {DiffNormData, DiffNormItem} from '@models/diff_norm_models';
import {SelectOptions} from '@models/select_options_model';

import {
    ICoefficientSlice,
    createCoefficientAssignSlice,
} from './slices/coefficient-assign.slice';
import {
    IKoefficientParkSlice,
    createKoefficientParkSlice,
} from './slices/koefficient-park.slice';

interface IDiffNorm {
    routeData: DiffNormData;
    isRouteOpen: boolean;
    isModelOpen: boolean;
    setRouteData: (data: DiffNormData) => void;
    editRouteData: (data: DiffNormItem[]) => void;
    setRouteOpen: () => void;
    setModelOpen: () => void;
    reset: () => void;
}

type DiffNormType = IDiffNorm & ICoefficientSlice & IKoefficientParkSlice;
type AppliedStatus = 'applied' | 'out_of_date' | 'not_applied';
export interface IApplyCoefDTO {
    park_id: number;
    from_time: string;
    to_time: string;
    coef_id: number;
}

export interface IAppliedCoefResponse {
    status: AppliedStatus;
    from_time: string | null;
    to_time: string | null;
    coef_id: number | null;
}

export interface IDenyCoefDTO {
    park_id: number;
    coef_id: number;
}

export const useDiffNormStore = create<DiffNormType>((set, get, api) => ({
    routeData: {} as DiffNormData,
    isRouteOpen: false,
    isModelOpen: false,
    setRouteData: (routeData) => set({routeData}),
    editRouteData: (data) =>
        set(
            produce((state: IDiffNorm) => {
                state.routeData.diffNormItems = data;
            }),
        ),
    setRouteOpen: () => set((state) => ({isRouteOpen: !state.isRouteOpen})),
    setModelOpen: () => set((state) => ({isModelOpen: !state.isModelOpen})),
    reset: () => {
        set({
            coefDateRange: undefined,
            selectedKoefOption: {} as SelectOptions<number>,
        });
    },
    ...createCoefficientAssignSlice(set, get, api),
    ...createKoefficientParkSlice(set, get, api),
}));
