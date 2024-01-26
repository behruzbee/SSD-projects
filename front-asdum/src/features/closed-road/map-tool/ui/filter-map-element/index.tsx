import {Checkbox} from '@mui/material';
import React from 'react';

import {useClosedRoadStore} from '@features/closed-road';
import {checkboxStyles} from '@styles/components/checkbox';
import s2 from '@views/monitoring/ui/monitoring-map-component/components/topbar-chekboxes/index.module.scss';

import s from './index.module.scss';

export const FilterMapElement = () => {
    const [isShowStations, isShowRoutes, setShowStations, setShowRoutes] =
        useClosedRoadStore((s) => [
            s.isShowStations,
            s.isShowRoutes,
            s.setShowStations,
            s.setShowRoutes,
        ]);
    return (
        <div className={s.filterMapElemContainer}>
            <div className={s2.withCheckbox}>
                <Checkbox
                    checked={isShowRoutes}
                    onChange={() => setShowRoutes(!isShowRoutes)}
                    sx={checkboxStyles}
                />
                <span>Маршруты</span>
            </div>
            <div className={s2.withCheckbox}>
                <Checkbox
                    checked={isShowStations}
                    onChange={() => setShowStations(!isShowStations)}
                    sx={checkboxStyles}
                />
                <span>Остановки</span>
            </div>
        </div>
    );
};
