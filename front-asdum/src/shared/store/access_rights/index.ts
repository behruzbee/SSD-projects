import create from 'zustand';

import {SelectOptions} from '@models/select_options_model';

interface IAccess {
    status: SelectOptions<string> | undefined;
    totalCountUser: number;
    page: number;
    searchTerm: string;
    refetchCount: number;
    setRefetchCount: () => void;
    setSearchTerm: (searchTerm: string) => void;
    setPage: (payload: number) => void;
    setTotalCountUsers: (payload: number) => void;
    setStatus: (payload: SelectOptions<string>) => void;
}

export const useAccessStore = create<IAccess>((set) => ({
    refetchCount: 0,
    page: 1,
    totalCountUser: 0,
    status: undefined,
    searchTerm: '',
    setRefetchCount: () =>
        set(({refetchCount}) => ({refetchCount: refetchCount + 1})),
    setSearchTerm: (searchTerm) => set({searchTerm}),
    setPage: (page) => set({page}),
    setTotalCountUsers: (totalCountUser) => set({totalCountUser}),
    setStatus: (status) => set({status}),
}));
