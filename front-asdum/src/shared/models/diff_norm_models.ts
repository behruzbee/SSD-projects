export interface DiffNormData {
    route_id: number;
    route_name: string;
    diffNormItems: DiffNormItem[];
}

export interface DiffNormItem {
    id: number;
    bus_model_id: number;
    bus_model_name: string;
    diff: number;
    coefficient: number;
    last_user: string;
    last_date: number;
}

export interface CoefModel {
    id: number;
    coefficient: number | string;
    amount: number | string;
    last_user: string;
    last_date: number | string;
    col1: number;
    actions: string;
    status: string;
    period: string;
}
