export interface IParkModel {
    garage_name: string;
    license_number: string;
    park: string;
    park_id: number;
    remark: string;
    fixed_garages: string;
    actions: string;
    col1: number; // for table
}
export interface ISinglePark {
    garages: {id: string; name: string}[];
    last_date: string;
    license_expire_date: string | null;
    last_user: string;
    park_license_num: string;
    park_name: string;
    park_remark: string;
    short_name: string;
    region_id: number;
}

export interface ISavePark {
    id: number | null;
    garage_id: string[];
    license_name: string;
    short_name: string;
    license_number: string;
    license_expire_date: string;
    region_id: number;
    remark?: string;
}

export interface IUpdateParkModel {
    name: string;
    license_number: string;
    garage_name: string;
    remark: string;
}

export interface GarageList {
    garage_name: any;
    lat: any;
    lng: any;
    radius: number;
    garage_remark: any;
}

export interface ISingleparkModel {
    garage_name: string;
    garage_remark: string;
    last_date: string;
    lat: string;
    license_expire_date: Date;
    lng: string;
    park_license_num: string;
    park_name: string;
    park: string;
    park_remark: string;
    radius: string;
    short_name: string;
}

export interface IGarageModel {
    coords: any;
    name: string;
    park_id: number[];
    type: string;
}
