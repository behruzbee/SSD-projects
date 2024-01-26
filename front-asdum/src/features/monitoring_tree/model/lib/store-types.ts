import L from 'leaflet';
import {GetState, SetState} from 'zustand';

import {IMappedTree, ParkRouteId} from '@features/monitoring_tree/lib/types';
import {MonitoringSidebarStore} from '@features/monitoring_tree/model/slices/monitoringSidebar.slice';
import {IBusCoords} from '@models/monitoring/bus-coords';
import {IBusMonitoring} from '@models/monitoring/monitoring-bus.model';
import {
    IMappedRoute,
    IRouteCoords,
    IStationCoords,
} from '@models/monitoring/route-coords';
import {NameIdModel} from '@models/name_id_model';
import {SelectOptions} from '@models/select_options_model';

import {BusInfoSlice} from '../slices/bus_info';
import {TopBarFilterSlice} from '../slices/topbar_filter';
import {NormalizedDataSchema} from './normalize';

export interface MonitoringMainState {
    map: L.Map | null;
    idsStore: Map<string, number>;
    mappedData: IMappedTree[];
    filteredMappedData: IMappedTree[];
    selected: number[];
    selectedUniqueId: string[];
    selectedParkRouteId: ParkRouteId;
    routeCoords: IMappedRoute[];
    filteredRoutes: IMappedRoute[];
    filteredBuses: IBusCoords[];
    busesCoords: IBusCoords[];
    busesList: SelectOptions<number>[];
    stationCoords: IStationCoords[];
    filteredStationCoords: IStationCoords[];
    searchBusValue: SelectOptions<number> | undefined;
    selectedBus: NameIdModel | null;
    selectedBusCoords: IBusCoords | null;
    expanded: string[];
    setMap: (map: L.Map | null) => void;
    setIdToMap: (data: IBusMonitoring[]) => void;
    normalizedData: NormalizedDataSchema | null;
    handleExpand: (event: React.SyntheticEvent, nodeIds: string[]) => void;
    handleSelect: (event: React.SyntheticEvent, nodeIds: string[]) => void;
    setSearchBusValue: (searchBusValue: SelectOptions<number>) => void;
    setRoutesCoords: (routes: IRouteCoords[]) => void;
    setFilteredBuses: (busesCoords: IBusCoords[]) => void;
    setFilteredRoutes: () => void;
    setFilterdStations: () => void;
    setSelected: (checked: boolean, currentNode: IMappedTree) => void;
    setMappedData: (comingData: IBusMonitoring[]) => void;
    setBusIcon: (busId: number) => React.ElementType;
    controlledMapBody: () => null;
}

export type MonitoringState = MonitoringMainState &
    BusInfoSlice &
    TopBarFilterSlice &
    MonitoringSidebarStore;

export type SetMonitoringState = SetState<MonitoringState>;
export type GetMonitoringState = GetState<MonitoringState>;
