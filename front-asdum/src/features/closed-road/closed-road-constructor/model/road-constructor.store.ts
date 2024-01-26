import 'leaflet-textpath';
import 'leaflet-draw';

import L, {LeafletMouseEvent} from 'leaflet';
import {v4 as uuid} from 'uuid';
import create from 'zustand';

import {ICRoadTbData} from '@features/closed-road/closed-road-table/model/closedRTbData.types';
import {timeParser} from '@shared/helpers/timeParser';

import busStationIcon from '@images/Monitoring/bus-station.png';
import stopStationIcon from '@images/Monitoring/stop-station.png';

import {mapConfig} from '../libs/mapConfig';
import {polylineMapper} from '../libs/polyline-mapper';
import {quoteParser} from '../libs/quote-parser';
import {
    Direction,
    IInitial,
    IRoadConstructor,
    Stations,
    idsStoreType,
} from './road-constructor.types';

const {drawControl, polylineLayer, stationsLayer} = mapConfig();

const initialState: IInitial = {
    map: null,
    id: null,
    closedRoadData: {
        id: null,
        fromDate: '',
        toDate: '',
        beginTime: '',
        endTime: '',
        streetName: '',
        fromDirection: '',
        toDirection: '',
        fromCenterStations: '',
        toCenterStations: '',
        firstSidePoints: [],
        secondSidePoints: [],
    },
    selectedData: {} as ICRoadTbData,
    routeDirection: 'to',
    firstRoute: [],
    secondRoute: [],
    stations: [],
    polylineObject: {},
    polylineStore: new Map(),
    idsStore: {} as idsStoreType,
    createdDate: {from: undefined, to: undefined},
    createdTime: {from: '', to: ''},
    closedStationsList: {from: [], to: []},
    streetInfo: {streetName: '', fromDirection: '', toDirection: ''},
    isShowStations: false,
    isValidated: false,
};

export const useClosedRoadStore = create<IRoadConstructor>((set, get) => ({
    ...initialState,
    isShowRoutes: true,
    setId: (id) => {
        set({id});
        get().setClosedRoadData('id');
    },
    setSelectedData: (payload) => {
        set({selectedData: payload});
    },
    setClosedRoadData: (type) => {
        const saved = get().closedRoadData;
        const time = get().createdTime;
        const date = get().createdDate;
        const street = get().streetInfo;
        const stations = get().closedStationsList;
        const polylines = get().polylineStore;
        const ids = get().idsStore;
        const id = get().id;
        switch (type) {
            case 'fromDate':
                saved[type] = timeParser(date?.from, 'YYYY-MM-DD');
                break;
            case 'toDate':
                saved[type] = timeParser(date?.to, 'YYYY-MM-DD');
                break;
            case 'beginTime':
                saved[type] = time?.from;
                break;
            case 'endTime':
                saved[type] = time?.to;
                break;
            case 'streetName':
                saved[type] = quoteParser(street.streetName);
                break;
            case 'fromDirection':
                saved[type] = quoteParser(street.fromDirection);
                break;
            case 'toDirection':
                saved[type] = quoteParser(street.toDirection);
                break;
            case 'fromCenterStations':
                saved[type] = stations.from
                    .map((station) => station.id)
                    .join(',');
                break;
            case 'toCenterStations':
                saved[type] = stations.to
                    .map((station) => station.id)
                    .join(',');
                break;
            case 'firstSidePoints':
                saved[type] = polylineMapper(polylines.get(ids.to)?.to);
                break;
            case 'secondSidePoints':
                saved[type] = polylineMapper(polylines.get(ids.from)?.from);
                break;
            case 'id':
                saved[type] = id;
        }
        set({closedRoadData: saved});
        get().validateFields(get().closedRoadData);
    },
    setStreetInfo: (data, type) => {
        set({streetInfo: {...get().streetInfo, [type]: data}});
        get().setClosedRoadData(type);
    },
    addClosedStation: (station, type) => {
        const closedStations = get().closedStationsList;
        const newStationsList: Stations[] = closedStations[type];
        newStationsList.push(station);
        if (type === 'to') {
            set({
                closedStationsList: {
                    from: closedStations.from,
                    to: newStationsList,
                },
            });
            get().setClosedRoadData('toCenterStations');
        } else {
            set({
                closedStationsList: {
                    from: newStationsList,
                    to: closedStations.to,
                },
            });
            get().setClosedRoadData('fromCenterStations');
        }
    },
    removeClosedStation: (station, type) => {
        const closedStations = get().closedStationsList;
        const filteredStations = closedStations[type].filter(
            (st) => st.id !== station.id,
        );

        if (type === 'to') {
            set({
                closedStationsList: {
                    from: closedStations.from,
                    to: filteredStations,
                },
            });
            get().setClosedRoadData('toCenterStations');
            console.log(
                'filtered stations: ',
                station,
                filteredStations,
                get().closedStationsList,
            );
        } else {
            set({
                closedStationsList: {
                    from: filteredStations,
                    to: closedStations.to,
                },
            });
            get().setClosedRoadData('fromCenterStations');
        }
    },
    clearClosedStations: (direction) => {
        const closedStationsList = get().closedStationsList;
        const type =
            direction === 'from' ? 'secondSidePoints' : 'firstSidePoints';
        if (direction === 'from') {
            closedStationsList.from = [];
        } else {
            closedStationsList.to = [];
        }

        set({closedStationsList});
        get().setClosedRoadData(type);
        stationsLayer.clearLayers();
        get().drawStations(get().stations);
    },
    setCreatedTime: (time, type) => {
        set({createdTime: {...get().createdTime, [type]: time}});
        if (type === 'from') {
            get().setClosedRoadData('beginTime');
        } else {
            get().setClosedRoadData('endTime');
        }
    },
    setCreatedDate: (dateRange) => {
        set({createdDate: dateRange});
        get().setClosedRoadData('fromDate');
        get().setClosedRoadData('toDate');
    },
    setIdsStore: (id, direction) => {
        set({idsStore: {...get().idsStore, [direction]: id}});
    },
    setPolylineStore: (polyline, event, direction) => {
        //@ts-ignore
        const id = polyline.options['id'];
        //@ts-ignore
        const type = polyline.options['type'];
        const prepareObj = {
            //@ts-ignore
            [type]: polyline.getLatLngs(),
        };

        get().setIdsStore(id, direction);

        if (event === 'draw:created') {
            //@ts-ignore
            get().polylineStore.set(id, prepareObj);
        }

        if (event === 'draw:edited') {
            //@ts-ignore
            get().polylineStore.set(id, prepareObj);
        }
        if (type === 'to') {
            get().setClosedRoadData('firstSidePoints');
        } else {
            get().setClosedRoadData('secondSidePoints');
        }
    },
    setShowStations: (checked) => {
        set({isShowStations: checked});
        get().drawStations(get().stations);
    },
    setShowRoutes: (checked) => {
        set({isShowRoutes: checked});
    },
    setStations: (stations) => {
        set({stations});
        get().drawStations(stations);
    },
    setMap: (map) => {
        set({map});
        const map2 = get().map;
        if (map2) {
            map2.on('draw:created', function (event) {
                const newPolyline = event.layer as L.Polyline;
                const uniqueId = uuid();
                //@ts-ignore
                newPolyline.options['type'] = get().routeDirection;
                //@ts-ignore
                newPolyline.options['id'] = uniqueId;
                get().setPolylineStore(
                    newPolyline,
                    'draw:created',
                    get().routeDirection,
                );
            });

            map2.on('draw:stop', function (event) {
                console.log('draw:stop: ', event);
            });

            map2.on('draw:edited', function (event) {
                //@ts-ignore
                const layersArr = Object.values(event.layers._layers);
                const setPolylineStore = get().setPolylineStore;

                if (layersArr.length > 1) {
                    //@ts-ignore
                    setPolylineStore(layersArr[0], 'draw:edited');
                    //@ts-ignore
                    setPolylineStore(layersArr[1], 'draw:edited');
                } else {
                    //@ts-ignore
                    setPolylineStore(layersArr[0], 'draw:edited');
                }
            });

            map2.on('draw:deleted', (event) => {
                const removePolyline = get().removePolylineFromStore;
                //@ts-ignore
                const layersArr = Object.values(event.layers._layers);
                layersArr.forEach((layer) => {
                    const id = (layer as L.Polyline).options[
                        'id' as keyof L.PolylineOptions
                    ];
                    const direction = (layer as L.Polyline).options[
                        'type' as keyof L.PolylineOptions
                    ];
                    removePolyline(id as string, direction as Direction);
                });
            });

            map.on('draw:editstart', function () {
                console.log('Draw edit started');
                drawControl.setDrawingOptions({
                    polyline: {
                        icon: new L.DivIcon({
                            iconSize: new L.Point(5, 5),
                            className:
                                'leaflet-div-icon leaflet-editing-icon my-own-class',
                        }),
                    },
                });
            });
        }
    },
    drawPolylines: (polylines) => {
        const map = get().map;
        const setPolyline = get().setPolylineStore;
        if (map) {
            const road = polylines.map((line) => [line.lat, line.lng]);
            const side = polylines[0].side.toString();
            const type = side === '1' ? 'to' : 'from';
            const polylineText = type === 'to' ? 'В центр' : 'От центра';
            //@ts-ignore
            const polyline = L.polyline(road, {
                weight: 4,
                color: 'tomato',
                type,
                id: side,
            });
            polyline.setText(polylineText, {
                center: false,
                repeat: false,
                offset: type === 'to' ? 20 : -20,
                below: true,
                orientation: 'flip',
                attributes: {fill: 'black', size: '20px'},
            });
            polyline.addTo(polylineLayer);
            map.addLayer(polylineLayer);
            //@ts-ignore
            setPolyline(polyline, 'draw:created', polyline.options.type);
        }
    },
    drawStations: (stations) => {
        const map = get().map;
        const selected = get().selectedData;
        let selectedStations: Array<number> = [];
        if ('id' in selected) {
            selectedStations = [
                ...selected.fromCenterStations,
                ...selected.toCenterStations,
            ].map((st) => st.id);
        }
        if (map && get().isShowStations) {
            stations.forEach((station) => {
                const iconUrl = selectedStations.includes(station.id)
                    ? stopStationIcon
                    : busStationIcon;
                L.marker([station.lat, station.lng], {
                    icon: L.icon({iconUrl}),
                })
                    .on('click', (e: LeafletMouseEvent) => {
                        const layer = e.target;
                        const icon = layer.options.icon.options.iconUrl;
                        console.log(layer.getLatLng(), station);
                        if (icon === busStationIcon) {
                            layer.setIcon(L.icon({iconUrl: stopStationIcon}));
                            get().addClosedStation(
                                station,
                                get().routeDirection,
                            );
                        } else {
                            layer.setIcon(L.icon({iconUrl: busStationIcon}));
                            get().removeClosedStation(
                                station,
                                get().routeDirection,
                            );
                        }
                    })
                    .bindTooltip(station.name)
                    .openTooltip()
                    .addTo(stationsLayer);
            });
            // circleLayer.addTo(map);
            stationsLayer.addTo(map);
        } else {
            stationsLayer.clearLayers();
            // circleLayer.clearLayers();
        }
    },
    setRouteDirection: (routeDirection) => {
        set({routeDirection});
    },
    resetRoadData: () => {
        set({
            ...initialState,
            closedRoadData: {
                id: null,
                fromDate: '',
                toDate: '',
                beginTime: '',
                endTime: '',
                streetName: '',
                fromDirection: '',
                toDirection: '',
                fromCenterStations: '',
                toCenterStations: '',
                firstSidePoints: [],
                secondSidePoints: [],
            },
            closedStationsList: {from: [], to: []},
        });
        get().drawStations([]);
        polylineLayer.clearLayers();
    },
    setRoadData: (payload) => {
        const setTime = get().setCreatedTime;
        const setDate = get().setCreatedDate;
        const setStreet = get().setStreetInfo;
        const drawPolylines = get().drawPolylines;
        const map = get().map;
        const {
            beginTime,
            endTime,
            fromDate,
            toDate,
            fromDirection,
            toDirection,
            fromCenterStations,
            toCenterStations,
            streetName,
            firstSidePoints,
            secondSidePoints,
            id,
        } = payload;

        setDate({from: new Date(fromDate), to: new Date(toDate)});
        setTime(beginTime, 'from');
        setTime(endTime, 'to');
        setStreet(streetName, 'streetName');
        setStreet(fromDirection, 'fromDirection');
        setStreet(toDirection, 'toDirection');
        drawPolylines(firstSidePoints);
        drawPolylines(secondSidePoints);
        get().setId(id);
        set({
            closedStationsList: {
                //@ts-ignore
                from: fromCenterStations,
                //@ts-ignore
                to: toCenterStations,
            },
        });

        get().setClosedRoadData('fromCenterStations');
        get().setClosedRoadData('toCenterStations');
        map && map.addControl(drawControl);
    },
    validateFields: (data) => {
        let validated = true;
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                if (!value.length) {
                    validated = false;
                    break;
                }
            } else {
                if (!value && key !== 'id') {
                    validated = false;
                    break;
                }
            }
        }
        set({isValidated: validated});
    },
    removePolylineFromStore: (id, direction) => {
        console.log({id, direction});
        const type =
            direction === 'from' ? 'secondSidePoints' : 'firstSidePoints';
        const idsStore = get().idsStore;
        delete idsStore[direction];
        set({idsStore});
        get().polylineStore.delete(id);
        get().clearClosedStations(direction);
        get().setClosedRoadData(type);
    },
}));
