export interface OrderSaveModel {
    ex_id: number | null | undefined;
    route_id: number;
    graph_number: any;
    bus_fact: number;
    race: number;
    station_id: any;
    driver_id: any;
    driver_id2?: any;
    date: string;
    from_time: string;
    to_time: string;
}

export interface IStationHistory {
    routeId: number;
    from_time: string;
    to_time: string;
    page: number;
    size: number;
    monthly: boolean;
}
