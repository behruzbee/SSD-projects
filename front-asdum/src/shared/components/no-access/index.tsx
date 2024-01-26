import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import NoAccessIcon from '@images/svgs/NoAccessIcon';

import styles from './index.module.scss';

export const NoAccess: FC = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.layer}>
                <div className={styles.iconWrapper}>
                    <NoAccessIcon style={{width: 48, height: 48}} />
                </div>
                <h3 className={styles.title}>{t('no_access')}</h3>
                <p className={styles.text}>{t('sorry_you_dont_have_access')}</p>
            </div>
        </div>
    );
};
