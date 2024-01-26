import 'leaflet-canvas-markers';
import 'leaflet-textpath';

import L from 'leaflet';
import create from 'zustand';

import stopStationIcon from '@images/Monitoring/stop-station.png';

import {ICRoadTbData, ICRoadTbSlice} from './closedRTbData.types';

const stationsLayer = new L.FeatureGroup();
const polylineLayer = new L.FeatureGroup();

export const useCRoadTbStore = create<ICRoadTbSlice>((set, get) => ({
    tableData: [],
    map: null,
    page: 1,
    size: 5,
    totalCount: 0,
    deletedId: null,
    setDeletedId: (id) => {
        set({deletedId: id});
    },
    setTotalCount: (totalCount) => {
        set({totalCount});
    },
    setPage: (page) => {
        set({page});
    },
    setMap: (map) => {
        set({map});
    },
    drawElements: (selected) => {
        stationsLayer.clearLayers();
        polylineLayer.clearLayers();
        if ('id' in selected) {
            const allStations = [
                ...selected.toCenterStations,
                ...selected.fromCenterStations,
            ];
            get().drawStations(allStations);
            get().drawPolylines(selected.firstSidePoints);
            get().drawPolylines(selected.secondSidePoints);
        }
    },
    drawStations: (stations) => {
        const map = get().map;
        console.log(map);

        if (map) {
            map.zoomIn(5, {animate: true});
            map.flyTo([stations[0].lat, stations[0].lng]);
            stations.forEach((station) => {
                new L.Marker(L.latLng(station.lat, station.lng), {
                    icon: L.icon({iconUrl: stopStationIcon}),
                })
                    .bindTooltip(station.station_name)
                    .openTooltip()
                    .addTo(stationsLayer);
            });
            map.addLayer(stationsLayer);
        }
    },
    drawPolylines: (polylines) => {
        const road = polylines.map((line) => [line.lat, line.lng]);
        const type = polylines[0].side === '1' ? 'to' : 'from';
        const polylineText = type === 'to' ? 'В центр' : 'От центра';
        //@ts-ignore
        const polyline = L.polyline(road, {
            weight: 4,
            color: 'tomato',
        }).addTo(polylineLayer);
        polyline.setText(polylineText, {
            center: true,
            repeat: false,
            offset: type === 'to' ? 20 : -20,
            below: true,
            orientation: 'flip',
            attributes: {fill: 'black', size: '20px'},
        });
        get().map?.addLayer(polylineLayer);
    },
    selectedData: {} as ICRoadTbData,
    setSelectedData: (payload) => {
        set({selectedData: payload});
    },
    setTableData: (data) => {
        set({tableData: data});
    },
}));
