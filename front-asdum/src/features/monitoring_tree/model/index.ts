import 'leaflet-canvas-markers';

import L from 'leaflet';
import create from 'zustand';

import {createMonitoringSidebarSlice} from '@features/monitoring_tree/model/slices/monitoringSidebar.slice';

import busStationIcon from '@images/Monitoring/bus-station.png';

import {handleBusSelectAction} from './actions/handleBusSelect';
import {setBusIconAction} from './actions/setBusIcon';
import {setMappedDataAction} from './actions/setMappedData';
import {setRoutesCoordsAction} from './actions/setRoutesCoords';
import {setSearchBusValueAction} from './actions/setSearchBusValue';
import {setSelectedAction} from './actions/setSelected';
import {MonitoringState} from './lib/store-types';
import {createBusInfoSlice} from './slices/bus_info';
import {createTopBarFilterSlice} from './slices/topbar_filter';

export const stationMarkersLayer: L.FeatureGroup = new L.FeatureGroup();
export const busRoutesLayer: L.FeatureGroup = new L.FeatureGroup();

export const useMonitoringTreeModel = create<MonitoringState>(
    (set, get, api) => ({
        map: null,
        mappedData: [],
        filteredMappedData: [],
        selected: [],
        selectedUniqueId: [],
        selectedParkRouteId: {parkId: NaN, routeId: NaN},
        routeCoords: [],
        filteredRoutes: [],
        filteredBuses: [],
        busesCoords: [],
        busesList: [],
        stationCoords: [],
        filteredStationCoords: [],
        searchBusValue: undefined,
        selectedBus: null,
        selectedBusCoords: null,
        expanded: [],
        normalizedData: null,
        idsStore: new Map(),
        setIdToMap: (data) => {
            const ids = get().idsStore;
            data?.forEach((park) => {
                ids.set(park.unique_id, park.park_id);
                park?.routeList.forEach((route) => {
                    ids.set(route.unique_id, route.route_id);
                    route?.busList.forEach((bus) => {
                        ids.set(bus.unique_id, bus.bus_id);
                    });
                });
            });
        },
        setMap: (map) => {
            set({map});
        },
        controlledMapBody: () => null,
        setBusIcon: (busId) => setBusIconAction(busId, get),
        handleExpand: (_, nodeIds) => set({expanded: nodeIds}),
        handleSelect: (_, nodeIds) => {
            handleBusSelectAction(_, nodeIds, set, get);
        },
        setSearchBusValue: (searchBusValue) => {
            setSearchBusValueAction(searchBusValue, set, get);
        },
        setSelected: (isChecked, currentNode) => {
            setSelectedAction(isChecked, currentNode, set, get);
        },
        setMappedData: (comingData) => {
            get().setIdToMap(comingData);
            setMappedDataAction(comingData, set, get);
        },
        setRoutesCoords: (newCoords) => {
            setRoutesCoordsAction(newCoords, set, get);
        },
        setFilteredBuses: (busesCoords) => {
            const uidSelected = get().selectedUniqueId;
            const filteredBuses = busesCoords.filter((bus) =>
                uidSelected.includes(bus.unique_id),
            );
            set({filteredBuses, busesCoords: filteredBuses});
            get().filterBusesOnFetch();
            if (get().isSidebarOpen) {
                get().updateSidebarData(busesCoords);
            }
        },
        setFilteredRoutes: () => {
            const routeCoords = get().routeCoords;

            const {routeLinesChecked, map, selected} = get();

            const filteredRoutes = routeCoords.filter((route) =>
                selected.includes(route.route_id),
            );

            if (routeLinesChecked) {
                busRoutesLayer.clearLayers();
                filteredRoutes.forEach((route) => {
                    if (route.coords[0] && route.coords[1]) {
                        L.polyline(route.coords).addTo(busRoutesLayer);
                    }
                });
                {
                    map && busRoutesLayer.addTo(map);
                }
            } else {
                {
                    map && busRoutesLayer.removeFrom(map);
                }
            }

            set({filteredRoutes});
            get().filterRouteLinesOnFetch();
        },
        setFilterdStations: () => {
            const {stationsChecked, map, selected, stationCoords} = get();
            if (!map) return;

            const filteredStationCoords = stationCoords.filter((station) =>
                selected.includes(station.routeId),
            );

            if (stationsChecked) {
                stationMarkersLayer.clearLayers();
                filteredStationCoords.forEach((station) => {
                    // @ts-ignore
                    L.canvasMarker(
                        L.latLng(station.coords[0], station.coords[1]),
                        {
                            img: {
                                url: busStationIcon,
                                size: [25, 25],
                            },
                        },
                    ).addTo(stationMarkersLayer);
                });

                stationMarkersLayer.addTo(map);
            } else {
                stationMarkersLayer.clearLayers();
            }
        },
        ...createBusInfoSlice(set, get, api),
        ...createTopBarFilterSlice(set, get, api),
        ...createMonitoringSidebarSlice(set, get, api),
    }),
);
