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

import {usePolygonStore} from '@src/shared/store/polygon';

import {constants, helper} from '@shared/helpers';
import {defaultMapState} from '@shared/lib/map-defaults/defaultMapState';

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
        setOpenSide(false);
    };

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

            map.setCenter(
                [
                    query.state['kpp_station'].lat,
                    query.state['kpp_station'].lng,
                ],
                20,
            );
        }

        return () => setPolygon([]);
    }, [query.state?.coordinates, map]);

    return (
        <div className={styles.container}>
            {/*@ts-ignore*/}
            <YMaps query={yQuery}>
                {/*@ts-ignore*/}
                <Map
                    style={yStyle}
                    defaultState={defaultMapState}
                    // onClick={onMapClick}
                    modules={[YENUM.MODULE]}
                    //@ts-ignore
                    instanceRef={(ref) => {
                        setYMap(ref);
                    }}
                    state={defaultMapState}
                    options={{
                        maxZoom: 20,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Polygon
                        geometry={[polygon]}
                        onContextMenu={handleContext}
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
                    />
                    {/*@ts-ignore*/}
                    <ZoomControl options={{float: 'right'}} />
                    {query.state.id ? null : (
                        <>
                            {/*@ts-ignore*/}
                            <RulerControl
                                onClick={handleClick}
                                options={{
                                    float: 'right',
                                }}
                            />
                        </>
                    )}
                </Map>
            </YMaps>
        </div>
    );
};

export default MapY;
