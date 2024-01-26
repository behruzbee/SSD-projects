import cx from 'classnames';
import React from 'react';

import RouteItem from '@components/RouteItem';
import {IAccordeonList} from '@models/tracker_statistics_model';

import {trackerStatisticsStore} from '../model';
import s from './index.module.scss';

export function CustomAccordeon() {
    const {
        textChecker,
        accordeonList,
        setSelectedId,
        selectedParkId,
        setSelectedParkData,
    } = trackerStatisticsStore((state) => state);

    const handleClick = (item: IAccordeonList) => {
        const {park_id} = item;
        setSelectedId(park_id);
        setSelectedParkData(item);
    };

    return (
        <div className={cx(s.trackerAccordeonWrap)}>
            {accordeonList.map((item) => (
                <RouteItem
                    key={item.park_id}
                    handleId={() => handleClick(item)}
                    selected={selectedParkId === item.park_id}
                    id={item.park_id}
                    name={textChecker(item.park_name)}
                />
            ))}
        </div>
    );
}
