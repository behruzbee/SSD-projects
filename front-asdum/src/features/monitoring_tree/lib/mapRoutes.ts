import {IMappedRoute, IRouteCoords} from '@models/monitoring/route-coords';

export const mapRoutes = (data: IRouteCoords[]): IMappedRoute[] => {
    return data.map((route) => ({
        ...route,
        coords: route.coord.map((c) => [c.lat, c.lng]),
    }));
};
