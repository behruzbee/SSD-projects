import {Icon} from 'leaflet';
import React, {useEffect, useRef} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
    Circle,
    FullscreenControl,
    Map,
    Placemark,
    RulerControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {constants, locationParser} from '@shared/helpers';
import {useStationsStore} from '@store/station';

const {MAP_ICON, YENUM, tashkentzoom, yQuery} = constants;

export const getIcon = (type: number) => {
    return new Icon({
        iconUrl: type === 1 ? MAP_ICON.STATION : MAP_ICON.KPP_BUS,
        iconSize: [25, 35],
    });
};

const fillColor = (type: number) => ({
    strokeColor: type === 1 ? '#80A374' : '#563EE4',
    fillColor: type === 1 ? '#6EC475' : '#6C60E4',
    opacity: 0.8,
});

const SchemaMap = () => {
    const map = useRef<any>(null);

    const {
        stations,
        coords,
        setCoords,
        setPolyLines,
        setDragLast,
        setStations,
    } = useStationsStore((state) => ({...state}), shallow);

    const mapState = {
        center: tashkentzoom,
        zoom: 12,
        behaviors: ['default', 'scrollZoom'],
        controls: [],
    };

    useEffect(() => {
        return () => {
            setCoords([]);
            setPolyLines([]);
            setDragLast([]);
            setStations([]);
        };
    }, []);

    // Bug was fixed, but this shit should be defenitely refactored
    const ruler = map.current?.behaviors?.get('ruler');
    useEffect(() => {
        const drawRuler = () => {
            const parsedCoords = locationParser.locatioParser(coords);
            ruler.setState(parsedCoords);
        };

        if (coords && map && ruler) drawRuler();
    }, [map, coords, ruler]);

    const handleClick = () => {
        const latLngs = map.current?.behaviors
            .get('ruler')
            .geometry.getCoordinates();

        console.log(latLngs, 'latLngs');
        setCoords(
            latLngs.map((item: any) => ({
                lat: item[0],
                lng: item[1],
            })),
        );
    };

    return (
        <>
            {/*@ts-ignore*/}
            <OutsideClickHandler
                onOutsideClick={() => {
                    console.log('click outside');
                    handleClick();
                }}
            >
                {/*@ts-ignore*/}
                <YMaps query={yQuery}>
                    {/*@ts-ignore*/}
                    <Map
                        style={{
                            width: '100%',
                            height: '65vh',
                            transition: 'all 0.5s linear',
                        }}
                        defaultState={mapState}
                        modules={[YENUM.MODULE]}
                        // onClick={onMapClick}
                        //@ts-ignore
                        instanceRef={map}
                        state={mapState}
                        options={{
                            maxZoom: 40,
                        }}
                    >
                        {stations?.length > 0 &&
                            stations.map((coord) => {
                                return (
                                    <>
                                        {/*@ts-ignore*/}
                                        <Placemark
                                            key={coord.lat}
                                            geometry={[coord.lat, coord.lng]}
                                            modules={[
                                                'geoObject.addon.balloon',
                                                'geoObject.addon.hint',
                                            ]}
                                            properties={{
                                                balloonContent: `<strong>${coord['name']}</strong>`,
                                                baloonHint: `<strong>${coord['name']}</strong>`,
                                            }}
                                            onClick={() => {
                                                console.log('Add station');
                                                // addStation(coord);
                                            }}
                                            options={{
                                                iconLayout: 'default#image',
                                                iconImageSize: [25, 35],
                                                iconImageHref:
                                                    coord?.station_type === 1
                                                        ? MAP_ICON.STATION
                                                        : MAP_ICON.KPP_BUS,
                                            }}
                                        />
                                        {/*@ts-ignore*/}
                                        <Circle
                                            key={coord.lng}
                                            geometry={[
                                                [coord.lat, coord.lng],
                                                10,
                                            ]}
                                            options={fillColor(
                                                coord.station_type,
                                            )}
                                        />
                                    </>
                                );
                            })}
                        {/*@ts-ignore*/}
                        <RulerControl
                            onClick={handleClick}
                            options={{
                                float: 'left',
                            }}
                        />
                        {/*@ts-ignore*/}
                        <TrafficControl options={{float: 'right'}} />
                        {/*@ts-ignore*/}
                        <ZoomControl options={{float: 'right'}} />
                        {/*@ts-ignore*/}
                        <FullscreenControl options={{float: 'right'}} />
                        {/*@ts-ignore*/}
                        <TypeSelector
                            options={{
                                float: 'right',
                            }}
                        />
                    </Map>
                </YMaps>
            </OutsideClickHandler>
        </>
    );
};

export default SchemaMap;
