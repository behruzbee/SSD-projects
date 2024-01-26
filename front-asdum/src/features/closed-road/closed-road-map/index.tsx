import {ClosedRoadHead} from '@entities/closed-road-page';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MapContainer, TileLayer} from 'react-leaflet';

import {tashkentzoom} from '@shared/helpers';
import {leafletUrl} from '@shared/lib';

import s from './index.module.scss';

export const ClosedRoadMap = () => {
    const {t} = useTranslation();
    return (
        <div className={s.closedRoadMapContainer}>
            <ClosedRoadHead>
                <h2>{t('location_of_roads')}</h2>
            </ClosedRoadHead>
            <div className={s.closedRoadMap}>
                <MapContainer center={tashkentzoom} zoom={12} className={s.map}>
                    <TileLayer url={leafletUrl} />
                </MapContainer>
            </div>
        </div>
    );
};
