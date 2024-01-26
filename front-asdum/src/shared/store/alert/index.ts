import dayjs from 'dayjs';
import create, {GetState, SetState} from 'zustand';
import {persist} from 'zustand/middleware';

import {
    IAlertData,
    IIdleData,
    IIdleSocketData,
    ISpeedOver,
} from '@models/alert';
import {VERSION} from '@shared/constants';
import {timeParser} from '@shared/helpers/timeParser';

export type tabState = 'idle' | 'speed' | 'notInLine';

interface IAlert {
    speedOverData: IAlertData[];
    idleData: IIdleSocketData[];
    isAlarmPlay: boolean;
    alertTabState: tabState;
    notMarkedDataLength: {[key in tabState]: number};
    setNotMarkedDataLength: (type: tabState, payload: number) => void;
    setSpeedOverData: (payload: ISpeedOver) => void;
    setIdleData: (payload: IIdleData) => void;
    transformToAlert: (payload: ISpeedOver) => IAlertData[];
    idleTransform: (payload: IIdleData) => IIdleSocketData[];
    setIsAlarmPlay: (payload: boolean) => void;
    setAlertTabState: (payload: tabState) => void;
    checkAlert: (selected: any, type: string) => void;
    checkedItemsLength: (payload: any) => number;
    checkAll: (type: tabState) => void;
}

export const useAlertStore = create<IAlert>(
    persist(
        (set: SetState<IAlert>, get: GetState<IAlert>) => ({
            speedOverData: [],
            idleData: [],
            isAlarmPlay: false,
            alertTabState: 'idle',
            notMarkedDataLength: {idle: 0, notInLine: 0, speed: 0},
            transformToAlert: (payload) => {
                const data: IAlertData[] = Object.keys(payload)
                    .map((key) => ({
                        gos_number: key.split('/')[3],
                        full_park: key,
                        interval: '',
                        isChecked: true,
                        speed: payload[key].speed,
                        long: payload[key].time,
                        time: dayjs(payload[key].time).format(
                            'YYYY-MM-DD HH:mm:ss',
                        ),
                    }))
                    .sort((a, b) => b.long - a.long);
                return data;
            },
            idleTransform: (payload) => {
                const data: IIdleSocketData[] = Object.keys(payload)
                    .map((key) => ({
                        gos_number: key.split('/')[3],
                        full_park: key,
                        duration: timeParser(payload[key].idle, 'HH:mm:ss'),
                        station: payload[key].station,
                        isChecked: true,
                        long: payload[key].time,
                    }))
                    .sort((a, b) => b.long - a.long);
                return data;
            },
            setIsAlarmPlay: (payload) => {
                set({isAlarmPlay: payload});
            },
            setSpeedOverData: (payload) => {
                set({
                    speedOverData: get().transformToAlert(payload),
                });
                get().setNotMarkedDataLength(
                    'speed',
                    get().checkedItemsLength(get().speedOverData),
                );
            },
            setIdleData: (payload) => {
                set({idleData: get().idleTransform(payload)});
                get().setNotMarkedDataLength('idle', get().idleData.length);
            },
            setAlertTabState: (payload) => {
                set({alertTabState: payload});
            },
            setNotMarkedDataLength: (type, payload) => {
                set({
                    notMarkedDataLength: {
                        ...get().notMarkedDataLength,
                        [type]: payload,
                    },
                });
            },
            checkAlert: (selected, type) => {
                if (type === 'speed') {
                    let data = get().speedOverData;
                    data = data.map((item) => {
                        if (item.gos_number === selected.gos_number) {
                            item.isChecked = false;
                        }

                        return item;
                    });

                    set({speedOverData: data});
                    get().setNotMarkedDataLength(
                        'speed',
                        get().checkedItemsLength(get().speedOverData),
                    );
                }

                if (type === 'idle') {
                    let data = get().idleData;
                    data = data.map((item) => {
                        if (item.full_park === selected.full_park) {
                            item.isChecked = false;
                        }

                        return item;
                    });

                    set({idleData: data});
                    get().setNotMarkedDataLength(
                        'idle',
                        get().checkedItemsLength(get().idleData),
                    );
                }
            },
            checkedItemsLength: (payload) => {
                return payload.filter((item: any) => item.isChecked !== false)
                    .length;
            },
            checkAll: (type) => {
                if (type === 'speed') {
                    const payload = get().speedOverData.map((item: any) => {
                        item.isChecked = false;
                        return item;
                    });

                    set({speedOverData: payload});
                    get().setNotMarkedDataLength(
                        'speed',
                        get().checkedItemsLength(get().speedOverData),
                    );
                }

                if (type === 'idle') {
                    const payload = get().idleData.map((item: any) => {
                        item.isChecked = false;
                        return item;
                    });

                    set({idleData: payload});
                    get().setNotMarkedDataLength(
                        'idle',
                        get().checkedItemsLength(get().idleData),
                    );
                }
            },
        }),
        {
            name: 'violations',
            version: VERSION.V1,
        },
    ),
);
