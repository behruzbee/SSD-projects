import {StatusClass, StatusTypes} from '@models/status-types';

export interface IMappedTree {
    id: number;
    unique_id: string;
    name: string;
    status?: StatusClass | StatusTypes;
    children: IMappedTree[];
}

export type ParkRouteId = {
    parkId: number;
    routeId: number;
};
