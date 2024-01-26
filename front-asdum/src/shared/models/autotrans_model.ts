export interface IAutoTransModel {
    park_name: string;
    gos_number: number;
    garage_number: number | null;
    id: number;
    tracker: number;
    route_name: string;
    bus_model: string;
    tel: number;
    user_name: string;
    col1: number;
    actions: string;
}

export interface ISingleAutoTrans {
    id: number;
    marshrut_id: number;
    park_no: string;
    bus_model_id: number;
    model_name: string;
    tracker_id: string;
    license_number: string;
    license_expire_date: string | null;
    gos: string;
    tex_number: string | null;
    sim_number: string | null;
    tex_expire_date: string | null;
    insurance_number: string | null;
    insurance_expire_date: string | null;
    remark: string;
    park_id: number;
    park_name: string;
    made_date: string | null;
    region: number | null;
}

export interface IAutoTransSave {
    bus_id: number | null;
    garage_number: string;
    gos_number: string;
    tracker_imei: string;
    model_id: number;
    region_id: number;
    sim_number: string;
    parkId: number;
    made_date?: string | null;
    insurance_expire_date?: string | null;
    insurance_number?: string | null;
    license_expire_date?: string | null;
    license_number?: string | null;
    tex_number?: string | null;
    tex_expire_date?: string | null;
    remark?: string | null;
}
