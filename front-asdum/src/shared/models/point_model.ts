export interface IPoint {
    route_id: number;
    coordinatesList: CoordinatesList[];
}

export interface CoordinatesList {
    lat: number;
    lng: number;
    station_id: number | null;
    point_order: number;
}
