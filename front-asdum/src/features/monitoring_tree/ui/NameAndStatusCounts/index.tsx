import {Box} from '@mui/material';
import React from 'react';

import {calculateBusCount} from '@features/monitoring_tree/lib/calculateBusCount';
import {CommonStatusType, StatusClass} from '@models/status-types';
import {setStatusColor} from '@shared/lib/status-color-name/status-color';

import s from './index.module.scss';

interface Props {
    name: string;
    statusData: StatusClass | null;
}

const NameAndStatusCounts: React.FC<Props> = ({statusData, name}) => {
    const newCalculated = calculateBusCount(statusData);
    return (
        <div className={s.wrapper}>
            {name}
            {statusData && (
                <div className={s.status}>
                    |
                    {Object.entries(newCalculated).map(
                        ([key, value]: [CommonStatusType, number]) => (
                            <Box display="flex" key={key}>
                                <div style={{color: setStatusColor(key)}}>
                                    {value}
                                </div>
                                ,
                            </Box>
                        ),
                    )}
                    |
                </div>
            )}
        </div>
    );
};

export default NameAndStatusCounts;
