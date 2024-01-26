import {ElementRef} from 'react';

import {ICRoadTbData} from '@features/closed-road/closed-road-table/model/closedRTbData.types';
import {IPagination} from '@models/_pagination.types';
import {PolylineData} from '@models/map_types';

type ApproveRaceType = {
    status: ApproveStatus;
    description: string | null;
};

export type ApproveStatus = 'approved' | 'declined' | 'default';
export type SaveStatusRaceDTO = {
    status: boolean;
    description: string;
    id: number;
};

export type PolylineType = 'plan' | 'fact' | 'closed';
type StationsType = Array<{
    station_name: string;
    id: number;
    lat: number;
    lng: number;
}>;
export type TableDataType = {
    id: number;
    bus_id: number;
    description: string;
    garage_number: number;
    from_time: string;
    to_time: string;
    gos_number: string;
    race_number: number;
    time: string;
    kpp1_name: string;
    kpp2_name: string;
    plan_stat_count: number;
    fact_stat_count: number;
    plan_mileage: number;
    fact_mileage: number;
    stations_count: number;
    station: string;
    percent: string;
    status: ApproveStatus;
    route_name: string;
};

export type IdleTableDataType = {
    id: number;
    bus_id: number;
    description: string;
    garage_number: number;
    from_time: number;
    to_time: number;
    gos_number: string;
    race_number: number;
    time: string;
    kpp1_name: string;
    kpp2_name: string;
    plan_time: number;
    fact_time: number;
    diff_time: string;
    status: ApproveStatus;
    route_name: string;
};

export type ViolationRaceDTO = {list: Array<TableDataType>; totalCount: number};
export type ViolationIdleDTO = {
    list: Array<IdleTableDataType>;
    total_count: {count: number};
};

type PolylineDataDTO = {lat: number; lng: number; side?: number};

export type ViolationMapDataDTO = {
    plan_coords: Array<PolylineDataDTO>;
    fact_coords: Array<PolylineDataDTO>;
};

export interface IMapSliceActions {
    setMap: (map: L.Map) => void;
    filterClosedRoad: (selected: TableDataType) => void;
    drawPolyline: (polyline: PolylineData, type: PolylineType) => void;
    drawStations: (stations: StationsType) => void;
    roadViolationListener: (data: Array<ICRoadTbData>) => void;
    setClosedRoadData: (data: Array<ICRoadTbData>) => void;
    polylineDataMapper: <T extends {lat: number; lng: number}>(
        data: Array<T>,
    ) => PolylineData;
    violationMapDataListener: (data: ViolationMapDataDTO) => void;
    clearHistoryPolyline: () => void;
    clearClosedRoadLayer: () => void;
}

export interface IMapSliceState {
    map: L.Map | null;
    mapContainerRef: null | ElementRef<'div'>;
    closedRoadData: Array<ICRoadTbData>;
}

export interface IApproveRaceState {
    approveRace: ApproveRaceType;
    selectedApprove: TableDataType | null;
}

export interface IApproveRaceActions {
    setApproveRace: (
        type: 'status' | 'description',
        payload: ApproveStatus & string,
    ) => void;
    setSelectedApprove: (payload: TableDataType | null) => void;
    resetStatus: () => void;
}

export interface IViolationTableState
    extends Omit<IPagination, 'setPage' | 'setTotalCount'> {
    tableData: Array<TableDataType>;
    searchTerm: {key: string; value: string};
}

export interface IViolationTableActions
    extends Omit<IPagination, 'page' | 'size' | 'totalCount'> {
    setTableData: (payload: Array<TableDataType>) => void;
    setSearch: ({key, value}: {key: string; value: string}) => void;
}

export interface IViolationIdleTableState {
    idleTableData: Array<IdleTableDataType>;
    idleSearchTerm: {key: string; value: string};
    idlePage: number;
    idleSize: number;
    idleTotalCount: number;
}

export interface IViolationIdleTableActions {
    setIdleTableData: (data: Array<IdleTableDataType>) => void;
    setIdleSearch: ({key, value}: {key: string; value: string}) => void;
    setIdlePage: (page: number) => void;
    setIdleTotalCount: (totalCount: number) => void;
}

export type IRoadViolationActions = IViolationTableActions &
    IApproveRaceActions &
    IMapSliceActions &
    IViolationIdleTableActions;
export type IRoadViolationState = IViolationTableState &
    IApproveRaceState &
    IMapSliceState &
    IViolationIdleTableState;
