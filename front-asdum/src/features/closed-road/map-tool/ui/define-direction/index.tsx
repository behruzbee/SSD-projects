import {Button, Radio} from '@mui/material';
import React from 'react';
import shallow from 'zustand/shallow';

import {useClosedRoadStore} from '@features/closed-road';
import {SvgGenerator} from '@shared/components';

import {ReactComponent as resetIcon} from './assets/reset.svg';
import s from './index.module.scss';

export const DefineDirection = () => {
    const [direction, setDirection] = useClosedRoadStore(
        (s) => [s.routeDirection, s.setRouteDirection],
        shallow,
    );

    return (
        <div className={s.defineDirRadio}>
            <div>
                <span className={s.defineDirTitle}>Направление маркера</span>
                <Radio
                    checked={direction === 'from'}
                    onChange={() => setDirection('from')}
                    value="from"
                    id={'from'}
                    name="radio-buttons"
                    inputProps={{'aria-label': 'FROM'}}
                />
                <label htmlFor={'from'} className={s.defineDirectionLabel}>
                    От центра
                </label>
                <Radio
                    checked={direction === 'to'}
                    onChange={() => setDirection('to')}
                    value="to"
                    id={'to'}
                    name="radio-buttons"
                    inputProps={{'aria-label': 'TO'}}
                />
                <label htmlFor={'to'} className={s.defineDirectionLabel}>
                    К центру
                </label>
            </div>
            <div className={s.directionReset}>
                <Button color={'inherit'} variant={'outlined'}>
                    <span>Сбросить линию</span>
                    <SvgGenerator Icon={resetIcon} />
                </Button>
            </div>
        </div>
    );
};
