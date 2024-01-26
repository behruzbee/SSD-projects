import {FC} from 'react';
import React from 'react';

import {StatusCheckbox} from '@features/monitoring/monitoring-map-sidebar/ui/status-select/ui/status-checkbox';

import {statusOption} from '../../model';
import s from './index.module.scss';

interface IStatusOption {
    option: statusOption;
    onClick: (id: number) => void;
}

export const StatusOption: FC<IStatusOption> = ({option, onClick}) => {
    return (
        <div
            onClick={() => onClick(option.id)}
            key={option.id}
            className={s.statusOption}
        >
            <div>{option.name}</div>
            <div>
                <StatusCheckbox option={option} />
            </div>
        </div>
    );
};
