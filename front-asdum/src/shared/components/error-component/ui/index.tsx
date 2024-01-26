import {Button} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';

import s from './index.module.scss';

export const ErrorComponent = () => {
    const {t} = useTranslation();
    const reload = () => {
        location.reload();
    };
    return (
        <div className={s.errorPage}>
            <div>{t('error_occured')}</div>
            <Button variant="contained" onClick={reload}>
                {t('reload_page')}
            </Button>
        </div>
    );
};
