import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
    Map,
    Placemark,
    Polygon,
    RulerControl,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import PolygonColor from '@features/polygon-color';
import {constants, helper, locationParser} from '@shared/helpers';
import {MAP_ICON} from '@shared/helpers/constants';
import {defaultMapState} from '@shared/lib/map-defaults/defaultMapState';
import {usePolygonStore} from '@store/polygon';

import styles from './index.module.scss';

const {YENUM, yQuery, yStyle} = constants;
const {parsedColorText, stringToRgba} = helper;

interface LocationState {
    state: any;
}

const MapY = () => {
    const [map, setYMap] = useState<any>(null);
    const [draw, setDraw] = useState(false);
    const location = useLocation();
    const query = location as LocationState;

    const {fillColor, setOpenSide, polygon, setPolygon, setColor} =
        usePolygonStore((state) => ({...state}), shallow);

    const handleClick = () => {
        setDraw(!draw);
    };

    const handleContext = () => {
        console.log('handleContext');
        setPolygon([]);
        setOpenSide(false);
    };

    const handlePolygon = () => {
        setOpenSide(true);
    };

    const handleRef = (ref: any) => {
        setYMap(ref);
    };

    useEffect(() => {
        const latLngs = map?.behaviors.get('ruler').geometry.getCoordinates();
        console.log(latLngs, 'latLngs');
        if (!draw && latLngs?.length > 1) {
            setPolygon(latLngs);
            setOpenSide(true);
            // map?.behaviors?.get('ruler').setState('');
        }
    }, [draw]);

    useEffect(() => {
        if (query.state?.coordinates?.length && map) {
            setPolygon(
                query.state.coordinates?.map((coord: any) => {
                    return [coord.lat, coord.lng];
                }),
            );

            setColor(
                stringToRgba(
                    parsedColorText(query.state?.color || 'rgba(0, 0, 0, 0.5)'),
                ),
            );
        }

        return () => setPolygon([]);
    }, [query.state?.coordinates, map]);

    const handleSet = () => {
        const latLngs = map?.behaviors.get('ruler').geometry.getCoordinates();
        setPolygon(latLngs);
    };

    useEffect(() => {
        if (map) {
            map.setCenter(
                [
                    query.state['kpp_station'].lat,
                    query.state['kpp_station'].lng,
                ],
                20,
            );
        }
    }, [map]);

    return (
        <div className={styles.container}>
            <PolygonColor />
            {/*@ts-ignore*/}
            <YMaps query={yQuery}>
                {/*@ts-ignore*/}
                <Map
                    style={{...yStyle, borderRadius: 12, height: 600}}
                    defaultState={defaultMapState}
                    // onClick={onMapClick}
                    onMouseUp={() => {
                        const latLngs = map?.behaviors
                            .get('ruler')
                            .geometry.getCoordinates();
                        setPolygon(latLngs);
                    }}
                    onMouse
                    onDrag={() => {
                        handleSet();
                    }}
                    modules={[YENUM.MODULE]}
                    instanceRef={(ref) => {
                        handleRef(ref);
                    }}
                    state={defaultMapState}
                    options={{
                        maxZoom: 20,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Polygon
                        geometry={[polygon]}
                        onClick={handlePolygon}
                        onContextMenu={handleContext}
                        onMouseLeave={() => handleSet()}
                        onMouseEnter={() => handleSet()}
                        options={{
                            editorDrawingCursor: 'crosshair',
                            editorMaxPoints: 5,

                            fillColor: fillColor,
                            // Цвет обводки.
                            strokeColor: 'rgba(0, 0, 0, 0.5)',
                            // Ширина обводки.
                            strokeWidth: 5,
                        }}
                    />
                    {/*@ts-ignore*/}
                    <Placemark
                        geometry={[
                            query.state['kpp_station'].lat,
                            query.state['kpp_station'].lng,
                        ]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [30, 35],
                            iconImageHref: MAP_ICON.LAST_STATION,
                        }}
                    />
                    {/*@ts-ignore*/}
                    <ZoomControl options={{float: 'right'}} />
                    {/*@ts-ignore*/}
                    <RulerControl
                        onClick={handleClick}
                        onLoad={() => {
                            const parsedCoords = locationParser.locatioParser(
                                query?.state?.coordinates,
                            );
                            console.log(parsedCoords, '=== 1111 coords parse');

                            if (map) {
                                map.behaviors
                                    .get('ruler')
                                    .setState(parsedCoords);
                            }
                        }}
                        options={{
                            float: 'right',
                        }}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapY;
