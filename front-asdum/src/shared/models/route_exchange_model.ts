export interface RouteExchangeModel {
    graph_id: null;
    gos: string;
    model: string;
    bus_id?: number;
    even: number;
    race: number;
    from_time: string;
    to_time: string;
    station: string;
    tab_number: string;
    driver_name: string;
    tab_num_con: null;
    conductor_name: null;
    garage_number: string;
    created: number;
    user_name: string;
    id: number;
    ex_id: number | undefined | null;
}

export interface monthlyRouteExchangeModel {
    graph_id: number;
    gos: string;
    garage_number: string | number;
    model: string;
    even: number;
    race: number;
    from_date: string;
    to_date: string;
    station: string;
    tab_number: string;
    driver_name: string;
    created: number;
    user_name: string;
    first_ex_id: number | null | undefined;
    second_ex_id: number | null | undefined;
    first_driver: string;
    second_driver: string;
    first_even: number;
    second_even: number;
    first_tab_number: string;
    second_tab_number: string;
}

export interface RouteExchangeOrder {
    id: number;
    g: string;
    vianum: string;
    model: string;
}
