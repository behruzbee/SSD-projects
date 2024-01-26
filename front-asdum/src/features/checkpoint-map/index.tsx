import React from 'react';
import {
    Map,
    ObjectManager,
    Placemark,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {useStations} from '@api/stations_list/hooks';
import {AddModal, RightBar} from '@features/checkpoints';
import {StationPermissions} from '@shared/constants/permissions/manage.permissions';
import {MAP_ICON, yQuery} from '@shared/helpers/constants';
import {permissionChecker} from '@shared/helpers/permission';
import {defaultMapState} from '@shared/lib/map-defaults/defaultMapState';
import {useAuthStore} from '@shared/store/auth';
import {useMainStore} from '@shared/store/main';
import {useStationsListStore} from '@shared/store/stations_list';
import {useCheckpointsHook} from '@views/manage/checkpoints/useCheckpointsHook';

import s from './index.module.scss';

const placemarkOptions = {
    iconLayout: 'default#image',
};
export const CheckpointMap = () => {
    const {isLoading} = useStations();
    const {openSide, open} = useMainStore((state) => state, shallow);
    const draggableStation = useStationsListStore((s) => s.draggableStation);
    const {
        coords,
        stationsList,
        setYandexRef,
        onMapClick,
        onStationClick,
        handleDragEnd,
    } = useCheckpointsHook();
    const userInfo = useAuthStore((state) => state.userInfo);

    const onDragEnd = (e: any) =>
        handleDragEnd(e.get('target').geometry.getCoordinates());
    return (
        <>
            {/*@ts-ignore*/}
            <YMaps query={yQuery}>
                {/*@ts-ignore*/}
                <Map
                    style={{
                        width: '100%',
                        height: '80%',
                        padding: '0 20px 20px 20px',
                        overflow: 'hidden',
                        transition: 'all 0.5s linear',
                    }}
                    defaultState={defaultMapState}
                    onClick={onMapClick}
                    modules={['multiRouter.MultiRoute']}
                    state={defaultMapState}
                    options={{maxZoom: 20}}
                    instanceRef={(ref) => setYandexRef(ref)}
                >
                    {/*@ts-ignore*/}
                    <ObjectManager
                        onClick={onStationClick}
                        options={{
                            clusterize: true,
                            gridSize: 40,
                            margin: 10,
                        }}
                        features={stationsList?.map((item) => ({
                            type: 'Feature',
                            id: item?.id,
                            geometry: {
                                type: 'Point',
                                coordinates:
                                    draggableStation?.id !== item?.id
                                        ? [item?.lat, item?.lng]
                                        : [0, 0],
                            },
                            options: {
                                ...placemarkOptions,
                                iconImageSize:
                                    item?.station_type === 2
                                        ? [30, 30]
                                        : [24, 24],
                                iconImageHref:
                                    item?.station_type === 2
                                        ? MAP_ICON.LAST_STATION
                                        : MAP_ICON.STATION,
                            },
                        }))}
                        modules={[
                            'objectManager.addon.objectsBalloon',
                            'objectManager.addon.objectsHint',
                        ]}
                    />

                    {open && (
                        <>
                            {/*@ts-ignore*/}
                            <Placemark geometry={[coords?.lat, coords?.lng]} />
                        </>
                    )}

                    {draggableStation?.lat && (
                        <>
                            {/*@ts-ignore*/}
                            <Placemark
                                geometry={[
                                    draggableStation?.lat,
                                    draggableStation?.lng,
                                ]}
                                options={{...placemarkOptions, draggable: true}}
                                onDragEnd={onDragEnd}
                            />
                        </>
                    )}

                    {openSide && <RightBar />}

                    {open &&
                        permissionChecker(
                            StationPermissions.STATION_ADD,
                            userInfo?.permissions,
                        ) && <AddModal coords={coords} />}

                    {isLoading && <div className={s.dark} />}

                    {/*@ts-ignore*/}
                    <ZoomControl options={{float: 'right'}} />
                </Map>
            </YMaps>
        </>
    );
};
