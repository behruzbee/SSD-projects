import {IRouteCoords, IStationCoords} from '@models/monitoring/route-coords';

export const mapStations = (data: IRouteCoords[]): IStationCoords[] => {
    const stations = data
        .map((route) => ({
            ...route,
            coord: route.coord.map((c) => ({...c, routeId: route.route_id})),
        }))
        .map((route) =>
            route.coord.filter(
                (c) => c.station_id !== null && c.station_name !== null,
            ),
        )
        .flat()
        .map((station) => ({
            routeId: station.routeId,
            station_name: station.station_name,
            station_id: station.station_id,
            coords: [station.lat, station.lng],
        }));

    return stations as IStationCoords[];
};
