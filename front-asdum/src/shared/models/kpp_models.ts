export interface IKpp {
    number: number;
    stationName: string;
    kpp1Column: number;
    kpp2Column: number;
}

export interface KppModel {
    id: number;
    name: string;
    remark: string;
    lat: number;
    lng: number;
    station_type: number;
    stat_uniq_id: string;
    routes: string[];
}

export interface KppIdModel {
    id: number;
    name: string;
}
