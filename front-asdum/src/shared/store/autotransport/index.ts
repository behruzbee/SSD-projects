import produce from 'immer';
import create from 'zustand';

import {IFilter} from '@src/shared/models/filter_model';

import {filters} from './data';

interface IAutoTrans {
    totalCountTrans: number;
    page: number;
    searchTerm: string;
    filters: IFilter[];
    setFilters: (checked: boolean, payload: IFilter) => void;
    setPage: (payload: number) => void;
    setSearchTerm: (searchTerm: string) => void;
    setTotalCountTrans: (payload?: number) => void;
}

export const useAutoTransStore = create<IAutoTrans>((set) => ({
    page: 1,
    searchTerm: '',
    totalCountTrans: 0,
    filters: filters,
    setFilters: (checked, payload) => {
        set(
            produce((draft: IAutoTrans) => {
                const filter = draft.filters.find((filter) => {
                    return filter.type === payload.type;
                });
                if (filter) filter.isChecked = checked;
            }),
        );
    },
    setPage: (page) => set(() => ({page})),
    setSearchTerm: (searchTerm) => set(() => ({searchTerm})),
    setTotalCountTrans: (totalCountTrans) =>
        set(produce(() => ({totalCountTrans}))),
}));
