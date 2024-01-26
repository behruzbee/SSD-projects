export interface IStation {
    id: number;
    name: string;
    remark: string;
    lat: number;
    lng: number;
    station_type: number;
    stat_uniq_id: number | null;
    routes: string[];
}

export interface IStationSave {
    id: number | null;
    lat: number;
    lng: number;
    name: string;
    remark: string | null;
    routes: string[];
    stat_uniq_id: number | null;
    station_type: number;
}
