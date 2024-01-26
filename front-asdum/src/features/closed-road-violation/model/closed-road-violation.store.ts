import create from 'zustand';

import {
    IRoadViolationActions,
    IRoadViolationState,
} from './closed-road-violation.types';
import {
    createApproveRaceSlice,
    initialApprove,
} from './slices/approveRace.slice';
import {
    createIdleTableSlice,
    initialIdleTable,
} from './slices/idleTableData.slice';
import {createMapSlice, initialMapState} from './slices/map.slice';
import {createTableSlice, initialTable} from './slices/tableData.slice';

const initialState: IRoadViolationState = {
    ...initialMapState,
    ...initialApprove,
    ...initialTable,
    ...initialIdleTable,
};

export const useViolationRoadStore = create<
    IRoadViolationState & IRoadViolationActions
>((set, get, api) => ({
    ...initialState,
    ...createMapSlice(set, get, api),
    ...createApproveRaceSlice(set, get, api),
    ...createTableSlice(set, get, api),
    ...createIdleTableSlice(set, get, api),
    reset: () => {
        set({...initialState});
    },
}));
