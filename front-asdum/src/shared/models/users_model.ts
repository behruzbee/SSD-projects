import {NameIdModel} from './name_id_model';

export interface UserModel {
    id: number;
    fullname: string;
    login: string;
    region: NameIdModel;
    role: NameIdModel & {remark: string};
    remark: string;
    is_activated: boolean;
    actions: string;
    roleName?: string; // for table
    col1: number; // for table
    autos: Array<any>;
}

export interface ISaveUser {
    id: number | null;
    fullname: string;
    login: string;
    password: string | null;
    roleId: number;
    regionId: number;
    parkList: number[];
    isActivated: string | boolean;
    remark?: string;
}
