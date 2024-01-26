import {StateCreator} from 'zustand';

import {
    IViolationIdleTableActions,
    IViolationIdleTableState,
} from '../closed-road-violation.types';

export const initialIdleTable: IViolationIdleTableState = {
    idleTableData: [],
    idleSearchTerm: {key: '', value: ''},
    idlePage: 1,
    idleSize: 5,
    idleTotalCount: 1,
};
export const createIdleTableSlice: StateCreator<
    IViolationIdleTableState & IViolationIdleTableActions
> = (set) => ({
    ...initialIdleTable,
    setIdlePage: (idlePage) => {
        set({idlePage});
    },
    setIdleSearch: (idleSearchTerm) => {
        set({idleSearchTerm});
    },
    setIdleTableData: (idleTableData) => {
        set({idleTableData});
    },
    setIdleTotalCount: (idleTotalCount) => {
        const count = idleTotalCount ? idleTotalCount : 1;
        set({idleTotalCount: count});
    },
});
