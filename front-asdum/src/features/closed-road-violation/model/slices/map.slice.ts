import L, {LatLngExpression} from 'leaflet';
import {StateCreator} from 'zustand';

import {ICRoadTbData} from '@features/closed-road/closed-road-table/model/closedRTbData.types';
import {PolylineData} from '@models/map_types';

import stopStationIcon from '@images/Monitoring/stop-station.png';

import {
    IMapSliceActions,
    IMapSliceState,
    TableDataType,
} from '../closed-road-violation.types';

const stationsLayer = new L.FeatureGroup();
const polylineLayer = new L.FeatureGroup();
const historyPolylineLayer = new L.FeatureGroup();

export const initialMapState: IMapSliceState = {
    map: null,
    closedRoadData: [],
    mapContainerRef: null,
};
export const createMapSlice: StateCreator<IMapSliceActions & IMapSliceState> = (
    set,
    get,
) => ({
    ...initialMapState,
    setMap: (map) => {
        set({map});
    },
    drawPolyline: (polylineData, type) => {
        const map = get().map;
        const color =
            type === 'plan' ? '#4056BD' : type === 'fact' ? 'green' : 'tomato';
        const weight = 4;
        const opacity = type === 'plan' ? 1 : type === 'fact' ? 0.9 : 1;
        const polyline = L.polyline(polylineData, {
            weight,
            color,
            opacity,
        });
        if (map) {
            if (type === 'closed') {
                polyline.addTo(polylineLayer);
                map.addLayer(polylineLayer);
            } else {
                polyline.addTo(historyPolylineLayer);
                map.addLayer(historyPolylineLayer);
                if (type === 'fact') {
                    map.zoomIn(1, {animate: true});
                    map.flyTo(polylineData[0] as LatLngExpression);
                }
            }
        }
    },
    drawStations: (stations) => {
        const map = get().map;
        if (map) {
            stations.forEach((station) => {
                L.marker([station.lat, station.lng], {
                    icon: L.icon({iconUrl: stopStationIcon}),
                })
                    .bindTooltip(station.station_name)
                    .openTooltip()
                    .addTo(stationsLayer);
            });
            map.addLayer(stationsLayer);
        }
    },
    roadViolationListener: (data) => {
        const drawPolyline = get().drawPolyline;
        const drawStations = get().drawStations;
        const mapper = get().polylineDataMapper;
        data.forEach(async (item) => {
            await drawPolyline(mapper(item.secondSidePoints), 'closed');
            await drawStations(item.toCenterStations);
            await drawPolyline(mapper(item.firstSidePoints), 'closed');
            await drawStations(item.fromCenterStations);
        });
    },
    filterClosedRoad: (selected) => {
        const closedRoads = get().closedRoadData;
        get().clearClosedRoadLayer();
        const filter = (item: ICRoadTbData, selected: TableDataType) => {
            const selectedFromTime = new Date(selected.from_time);
            const selectedToTime = new Date(selected.to_time);
            const beginDate = new Date(`${item.fromDate} ${item.beginTime}`);
            const endDate = new Date(`${item.toDate} ${item.endTime}`);
            return (
                (selectedFromTime >= beginDate &&
                    selectedFromTime <= endDate) ||
                (selectedToTime >= beginDate && selectedToTime <= endDate)
            );
        };
        const filtered = closedRoads.filter((item) => filter(item, selected));
        get().roadViolationListener(filtered);
    },
    violationMapDataListener: (data) => {
        const {fact_coords, plan_coords} = data;
        const drawPolyline = get().drawPolyline;
        const mapper = get().polylineDataMapper;
        if (plan_coords && plan_coords.length) {
            drawPolyline(mapper(plan_coords), 'plan');
        }
        if (fact_coords && fact_coords.length) {
            drawPolyline(mapper(fact_coords), 'fact');
        }
    },
    polylineDataMapper: (data) => {
        const mapped: PolylineData = data.map((item) => [item.lat, item.lng]);
        return mapped;
    },
    setClosedRoadData: (closedRoadData) => {
        set({closedRoadData});
    },
    clearHistoryPolyline: () => {
        const map = get().map;
        if (map) {
            map.removeLayer(historyPolylineLayer);
            historyPolylineLayer.clearLayers();
        }
    },
    clearClosedRoadLayer: () => {
        const map = get().map;
        if (map) {
            map.removeLayer(polylineLayer);
            map.removeLayer(stationsLayer);
            stationsLayer.clearLayers();
            polylineLayer.clearLayers();
        }
    },
});
