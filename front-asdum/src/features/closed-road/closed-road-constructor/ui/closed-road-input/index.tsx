import {InputBase} from '@mui/material';
import cx from 'classnames';
import React, {FC, FocusEvent, useEffect, useState} from 'react';
import shallow from 'zustand/shallow';

import {DayRangePicker} from '@components/DayRangePicker';
import {useClosedRoadStore} from '@features/closed-road';

import {
    IRoadConstructorComponent,
    StreetInfoType,
} from '../../model/road-constructor.types';
import s from './index.module.scss';
import {TimePick} from './ui/time-pick';

export const ClosedRoadInput: FC<IRoadConstructorComponent> = ({edit}) => {
    const [
        date,
        setDate,
        setTime,
        closedStations,
        setStreetInfo,
        streetInfo,
        time,
        setRoad,
        map,
        selected,
    ] = useClosedRoadStore(
        (s) => [
            s.createdDate,
            s.setCreatedDate,
            s.setCreatedTime,
            s.closedStationsList,
            s.setStreetInfo,
            s.streetInfo,
            s.createdTime,
            s.setRoadData,
            s.map,
            s.selectedData,
        ],
        shallow,
    );
    const [streetData, setStreetData] = useState({
        streetName: streetInfo.streetName,
        from: streetInfo.fromDirection,
        to: streetInfo.toDirection,
    });
    const changeHandler = (
        e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: StreetInfoType,
    ) => {
        setStreetInfo(e.target.value, type);
    };

    useEffect(() => {
        if (edit && map) {
            setRoad(selected);
        }
    }, [map]);

    useEffect(() => {
        if ('streetName' in streetInfo) {
            const {fromDirection, streetName, toDirection} = streetInfo;
            setStreetData({streetName, from: fromDirection, to: toDirection});
        }
    }, [streetInfo]);

    return (
        <div className={s.closedRoadInputContainer}>
            <div>
                <DayRangePicker
                    handleRangeSelect={setDate}
                    selectedRange={date}
                    label={'Выберите промежуток'}
                />
            </div>
            <div>
                <label className={s.inputLabel} htmlFor="">
                    Время
                </label>
                <div className={s.timePickElement}>
                    <TimePick
                        defaultValue={time.from}
                        onChange={setTime}
                        type={'from'}
                    />
                    <TimePick
                        defaultValue={time.to}
                        onChange={setTime}
                        type={'to'}
                    />
                </div>
            </div>

            <div>
                <label className={s.inputLabel} htmlFor="">
                    Закрывающая улица
                </label>
                <InputBase
                    fullWidth={true}
                    value={streetData.streetName}
                    className={s.filled}
                    onChange={(e) =>
                        setStreetData({
                            ...streetData,
                            streetName: e.target.value,
                        })
                    }
                    onBlur={(e) => changeHandler(e, 'streetName')}
                    title={'Закрывающая улица'}
                    placeholder={'Введите название улицы'}
                />
            </div>

            <div>
                <label className={s.inputLabel} htmlFor="">
                    Участок №1
                </label>
                <InputBase
                    fullWidth={true}
                    className={s.filled}
                    value={streetData.from}
                    onChange={(e) =>
                        setStreetData({...streetData, from: e.target.value})
                    }
                    onBlur={(e) => changeHandler(e, 'fromDirection')}
                    title={'Закрывающая улица'}
                    placeholder={'Введите название участка'}
                />
            </div>

            <div>
                <label className={s.inputLabel} htmlFor="">
                    Участок №2
                </label>
                <InputBase
                    fullWidth={true}
                    className={s.filled}
                    value={streetData.to}
                    title={'Закрывающая улица'}
                    onChange={(e) =>
                        setStreetData({...streetData, to: e.target.value})
                    }
                    onBlur={(e) => changeHandler(e, 'toDirection')}
                    placeholder={'Введите название участка'}
                />
            </div>

            <div>
                <span className={cx(s.inputLabel, s.stationsInfoTitle)}>
                    Остановки
                </span>
                <div className={s.stationsInfo}>
                    <div>
                        <h3>В центр</h3>
                        <span>{closedStations.to.length || '-'}</span>
                    </div>
                    <div>
                        <h3>От центра</h3>
                        <span>{closedStations.from.length || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
