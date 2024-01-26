import cx from 'classnames';
import React from 'react';

import {IChip} from '../model/model';
import s from './index.module.scss';

export function Chip<T extends number | string>({data, maxWidth}: IChip<T>) {
    const classNames = cx(s.chipWrap, maxWidth ? s.overflow : '');
    return (
        <div style={{maxWidth}} className={classNames}>
            {data.map((item, i) => (
                <div key={i} className={cx(s.chip)}>
                    {item}
                </div>
            ))}
        </div>
    );
}
