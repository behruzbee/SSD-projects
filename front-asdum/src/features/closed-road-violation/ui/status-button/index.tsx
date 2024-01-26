import {Button} from '@mui/material';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import style from './index.module.scss';
import {IStatus, IStatusComponent} from './model/status-button.types';

const StatusComponent = ({status}: IStatusComponent) => {
    const {t} = useTranslation();
    const classnames = cx(
        style.common,
        status.toLowerCase() === 'approved' ? style.agreed : style.disagreed,
    );
    const statusName = t(status.toLowerCase());
    const statusElement = (
        <div className={classnames}>
            <span className={style.agreedTxt}>{statusName}</span>
        </div>
    );

    return statusElement;
};

export const StatusBtn = ({status, onClick}: IStatus) => {
    const {t} = useTranslation();

    if (status && status.toLowerCase() !== 'default') {
        return <StatusComponent status={status} />;
    }

    return (
        <div className={cx(style.chooseStatus, style.common)}>
            <Button color="inherit" onClick={onClick}>
                {t('choose_status')}
            </Button>
        </div>
    );
};
