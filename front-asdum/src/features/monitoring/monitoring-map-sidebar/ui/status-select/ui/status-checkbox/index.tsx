import React, {FC} from 'react';

import {statusOption} from '@features/monitoring/monitoring-map-sidebar/ui/status-select/model';
import {SvgGenerator} from '@shared/components';

import {ReactComponent as icon} from './assets/check.svg';
import s from './index.module.scss';

interface ICustomCheckbox {
    option: statusOption;
}

export const StatusCheckbox: FC<ICustomCheckbox> = ({option}) => {
    const classnames = [
        s.customCheckbox,
        option.enabled ? s.activeCustomCheckbox : '',
    ];
    return (
        <div>
            <div className={classnames.join(' ')}>
                {option.enabled ? <SvgGenerator Icon={icon} /> : null}
            </div>
            <input className={s.checkbox} type="checkbox" />
        </div>
    );
};
