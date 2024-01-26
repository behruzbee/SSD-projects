export interface IRouteCoords {
    coord: {
        lng: number;
        lat: number;
        station_name: string | null;
        station_id: number | null;
    }[];
    route_id: number;
    route_name: string;
}

export interface IStationCoords {
    routeId: number;
    coords: [number, number];
    station_name: string;
    station_id: number;
}

export interface IMappedRoute {
    coords: [number, number][];
    route_id: number;
    route_name: string;
}
