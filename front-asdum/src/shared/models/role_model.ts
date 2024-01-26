import {SavedPermissionType} from '@shared/store/permission/mock';

import {NameIdModel} from './name_id_model';

export interface IRoleModel extends NameIdModel {
    remark: string;
    deleted: boolean;
    permissionKeys: string[];
}
export interface IRoleModelState {
    id: null | number;
    name: string;
    remark: string;
}

export interface IPermit {
    url: string;
    permission: null | number;
}

export interface RoleModel extends NameIdModel {
    permissions: SavedPermissionType[];
    remark: string;
    col1: number;
    actions: string;
}
