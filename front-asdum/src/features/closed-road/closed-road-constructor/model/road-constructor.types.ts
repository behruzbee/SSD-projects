import L from 'leaflet';
import {DateRange} from 'react-day-picker';

import {ICRoadTbData} from '@features/closed-road/closed-road-table/model/closedRTbData.types';

export type Direction = 'to' | 'from';
export type PolylineType = Array<Record<'lat' | 'lng', number>>;
export type PolylineDto = Array<Record<'lat' | 'lng' | 'pointOrder', number>>;
export type PolylineDrawType = {side: string; lat: number; lng: number};

type EventType = 'draw:created' | 'draw:edited' | 'draw:deleted';
export type Stations = {
    id: number;
    lat: number;
    lng: number;
    name: string;
    remark: string;
    routes: Array<string>;
    stat_uniq_id: string;
    station_type: number;
};
export type PolylineObjType = Record<string, PolylineType>;
export type idsStoreType = Record<Direction, string>;
export type ClosedStations = {to: Array<Stations>; from: Array<Stations>};
export type StreetInfoType = 'streetName' | 'fromDirection' | 'toDirection';
export interface ISaveRoadConstructorDto {
    id?: number | null;
    fromDate: string;
    toDate: string;
    beginTime: string;
    endTime: string;
    streetName: string;
    fromDirection: string;
    toDirection: string;
    fromCenterStations: string;
    toCenterStations: string;
    firstSidePoints: PolylineDto;
    secondSidePoints: PolylineDto;
}

export interface IInitial {
    map: L.Map | null;
    id?: number | null;
    isValidated: boolean;
    selectedData: ICRoadTbData;
    closedRoadData: ISaveRoadConstructorDto;
    routeDirection: Direction;
    firstRoute: PolylineType;
    secondRoute: PolylineType;
    stations: Array<Stations>;
    streetInfo: {
        streetName: string;
        fromDirection: string;
        toDirection: string;
    };
    polylineObject: PolylineObjType;
    polylineStore: Map<string, Record<Direction, PolylineType>>;
    createdDate: DateRange;
    idsStore: idsStoreType;
    closedStationsList: ClosedStations;
    createdTime: {from: string; to: string};
    isShowStations: boolean;
}
export interface IRoadConstructor extends IInitial {
    setId: (id: number) => void;
    validateFields: (obj: ISaveRoadConstructorDto) => void;
    setStreetInfo: (payload: string, type: StreetInfoType) => void;
    addClosedStation: (payload: Stations, type: Direction) => void;
    removeClosedStation: (payload: Stations, type: Direction) => void;
    clearClosedStations: (direction: Direction) => void;
    isShowRoutes: boolean;
    setClosedRoadData: (type: keyof ISaveRoadConstructorDto) => void;
    setCreatedTime: (payload: string, type: Direction) => void;
    setCreatedDate: (payload: DateRange) => void;
    setIdsStore: (id: string, direction: Direction) => void;
    setPolylineStore: (
        payload: L.Polyline,
        event: EventType,
        direction: Direction,
    ) => void;
    setShowStations: (checked: boolean) => void;
    setShowRoutes: (checked: boolean) => void;
    setStations: (stations: Array<Stations>) => void;
    drawStations: (stations: Array<Stations>) => void;
    drawPolylines: (polylines: Array<PolylineDrawType>) => void;
    setRouteDirection: (payload: Direction) => void;
    setMap: (map: L.Map) => void;
    resetRoadData: () => void;
    setRoadData: (payload: ICRoadTbData) => void;
    setSelectedData: (payload: ICRoadTbData) => void;
    removePolylineFromStore: (id: string, direction: Direction) => void;
}

export interface IRoadConstructorComponent {
    edit?: boolean;
}
