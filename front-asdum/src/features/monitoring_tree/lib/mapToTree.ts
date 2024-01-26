import {IBusMonitoring} from '@models/monitoring/monitoring-bus.model';

import {IMappedTree} from './types';

export const mapToTree = (data: IBusMonitoring[]): IMappedTree[] => {
    return data.map((park) => ({
        status: park.statuses,
        id: park.park_id,
        name: park.park_name,
        unique_id: park.unique_id,
        children: park.routeList.map((route) => ({
            status: route.statuses,
            id: route.route_id,
            unique_id: route.unique_id,
            name: route.route_name,
            children: route.busList.map((bus) => ({
                status: bus.current_status as any,
                id: bus.bus_id,
                name: bus.gos_no,
                unique_id: bus.unique_id,
                children: null as any,
            })),
        })),
    }));
};
