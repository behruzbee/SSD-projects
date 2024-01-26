import {mapStations} from '@features/monitoring_tree/lib/mapStations';
import {IRouteCoords} from '@models/monitoring/route-coords';

import {mapRoutes} from '../../lib/mapRoutes';
import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';

export const setRoutesCoordsAction = (
    newCoords: IRouteCoords[],
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const curRouteCoords = get().routeCoords;
    const curStatinCoords = get().stationCoords;

    if (
        !curRouteCoords.some((c) =>
            newCoords.some((n) => n.route_id === c.route_id),
        )
    ) {
        const combinedRoutes = curRouteCoords.concat(mapRoutes(newCoords));
        const combinedStations = curStatinCoords.concat(mapStations(newCoords));

        set({routeCoords: combinedRoutes, stationCoords: combinedStations});
    }
};
