import React, {FC, useEffect} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';

import {LoaderComponent} from '@components/LoaderComponent';
import {tashkentzoom} from '@shared/helpers';
import {leafletUrl} from '@shared/lib';

import s from './index.module.scss';
import {IClosedRoadMap} from './model/closed-road-map.types';

const ControlledMap: FC<{setMap: (map: L.Map) => void}> = ({setMap}) => {
    const map = useMap();
    useEffect(() => setMap(map), []);
    return null;
};

export const ClosedRoadMap: FC<IClosedRoadMap> = ({
    setMap,
    mapComponent,
    isCanvas,
    isLoading,
    mapContainerRef,
}) => {
    return (
        <div className={s.mapContainer} ref={mapContainerRef}>
            {isLoading ? <LoaderComponent className={s.mapLoader} /> : null}
            <MapContainer
                className={s.map}
                center={tashkentzoom}
                zoom={12}
                preferCanvas={isCanvas}
            >
                <ControlledMap setMap={setMap} />
                <TileLayer url={leafletUrl} />
                {mapComponent}
            </MapContainer>
        </div>
    );
};
