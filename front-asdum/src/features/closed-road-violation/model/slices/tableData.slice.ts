import {StateCreator} from 'zustand';

import {
    IViolationTableActions,
    IViolationTableState,
} from '../closed-road-violation.types';

export const initialTable: IViolationTableState = {
    tableData: [],
    searchTerm: {key: '', value: ''},
    page: 1,
    size: 5,
    totalCount: 1,
};
export const createTableSlice: StateCreator<
    IViolationTableState & IViolationTableActions
> = (set) => ({
    ...initialTable,
    setPage: (page) => {
        set({page});
    },
    setSearch: (searchTerm) => {
        set({searchTerm});
    },
    setTableData: (tData) => {
        set({tableData: tData});
    },
    setTotalCount: (totalCount) => {
        const count = totalCount ? totalCount : 1;
        set({totalCount: count});
    },
});
