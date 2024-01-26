import {ClosedRoadMap} from '@entities/closed-road-page';
import React from 'react';

import {useClosedRoadStore} from '@features/closed-road';

import s from './index.module.scss';
import {DefineDirection} from './ui/define-direction';
import {DrawRoute} from './ui/draw-route';
import {FilterMapElement} from './ui/filter-map-element';

export const MapTool = () => {
    const [setMap, selected] = useClosedRoadStore((s) => [
        s.setMap,
        s.selectedData,
    ]);
    return (
        <div className={s.closedRoadConstructorWrap}>
            <FilterMapElement />
            <ClosedRoadMap
                setMap={setMap}
                mapComponent={!selected?.id ? <DrawRoute /> : undefined}
            />
            <DefineDirection />
        </div>
    );
};
