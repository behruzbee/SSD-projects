import {StatusClass} from '@models/status-types';

import {MainStatusType} from './busStatuses.model';

export interface IBusList {
    bus_id: number;
    gos_no: string;
    current_status: MainStatusType | string | keyof StatusClass;
    unique_id: string;
}

export interface IBusRouteList {
    route_id: number;
    route_name: string;
    busList: IBusList[];
    unique_id: string;
    statuses: StatusClass;
}

export interface IBusMonitoring {
    park_id: number;
    park_name: string;
    unique_id: string;
    routeList: IBusRouteList[];
    statuses: StatusClass;
}
