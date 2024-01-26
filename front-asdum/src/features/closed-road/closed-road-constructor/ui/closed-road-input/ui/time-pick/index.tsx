import React, {ChangeEventHandler, FC} from 'react';
import {useTranslation} from 'react-i18next';

import s from './index.module.scss';

interface ITimePick {
    type: 'from' | 'to';
    defaultValue?: string;
    onChange?: (value: string, type: string) => void;
}

export const TimePick: FC<ITimePick> = ({type, onChange, defaultValue}) => {
    const {t} = useTranslation();
    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value);
        onChange && onChange(e.target.value, type);
    };
    return (
        <div className={s.timePickContainer}>
            <div className={s.timePickTitle}>{t(type)}</div>
            <input
                defaultValue={defaultValue}
                onChange={changeHandler}
                type="time"
            />
        </div>
    );
};
