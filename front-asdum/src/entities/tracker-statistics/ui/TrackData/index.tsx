import {trackerStatisticsStore} from '@entities/tracker-statistics/model';
import Button from '@mui/material/Button';
import cx from 'classnames';
import React, {FC} from 'react';

import {ITrackerData} from '@models/tracker_statistics_model';
import {timeParser} from '@shared/helpers/timeParser';

import {TrackDataMenu} from '../track_data_menu';
import s from './index.module.scss';

interface ITrackerCell {
    row: ITrackerData;
    value: number;
}
export const TrackData: FC<ITrackerCell> = ({row, value}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {setSelectedRouteId} = trackerStatisticsStore((state) => state);
    const handleClick = (
        event: React.MouseEvent<HTMLElement>,
        row: ITrackerData,
    ) => {
        setSelectedRouteId(row.id, Object.keys(row));
        setAnchorEl(event.currentTarget);
    };
    return value ? (
        <>
            <Button
                onClick={(e) => handleClick(e, row)}
                className={cx(s.trackData, s.tomato)}
            >
                {timeParser(value, 'HH:mm:ss')}
            </Button>
            <TrackDataMenu
                value={value}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
        </>
    ) : null;
};
