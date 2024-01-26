import {StatusClass} from '../status-types';

export interface IParkRouteBus {
    park_name: string;
    park_id: number;
    routeList: Route[];
    statuses: StatusClass;
    unique_id: string;
}

export interface Route {
    busList: Bus[];
    route_id: number;
    route_name: string;
    statuses: StatusClass;
    unique_id: string;
}

export interface Bus {
    gos_no: string;
    bus_id: number;
    // status: StatusTypes;
    current_status: string;
    unique_id: string;
}
