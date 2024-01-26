import create from 'zustand';

import {RoleModel} from '@models/role_model';

export interface IRole {
    roles: RoleModel[];
    setRoles: (roles: RoleModel[]) => void;
    page: number;
    setPage: (page: number) => void;
    totalCount: number;
    setTotalCount: (totalCount: number) => void;
    refetch: number;
    setRefetch: (refetch: number) => void;
    permitM: boolean;
    setPermitM: (payload: boolean) => void;
}

export const useRoleStore = create<IRole>((set) => ({
    roles: [],
    page: 1,
    totalCount: 0,
    refetch: 0,
    permitM: false,
    setTotalCount: (totalCount) => set({totalCount}),
    setPermitM: (permitM) => set({permitM}),
    setRefetch: (refetch) => set({refetch}),
    setPage: (page) => set({page}),
    setRoles: (roles) => set({roles}),
}));
