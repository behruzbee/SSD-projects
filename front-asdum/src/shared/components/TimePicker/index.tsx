import {useDateTimeModel} from '@widgets/TopBarController';
import React, {FC, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import s from './index.module.scss';

interface ITimeProps {
    type: 'from' | 'to';
}

export const TimePicker: FC<ITimeProps> = ({type}) => {
    const {t} = useTranslation();
    const {time, setTime} = useDateTimeModel((state) => state, shallow);
    const isFrom = type === 'from';
    const title = useMemo(() => (isFrom ? t('from') : t('to')), [isFrom, t]);

    return (
        <div className={s.inputWrapper}>
            <div className={s.timeback}>{title}</div>
            <input
                className={s.input}
                type="time"
                name={type}
                value={time[type]}
                onChange={setTime}
            />
        </div>
    );
};
