import cx from 'classnames';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
export const DefineActive = ({isActive}: {isActive: boolean}) => {
    const {t} = useTranslation();
    const text = useMemo(
        () => (isActive ? t('active') : t('not_active')),
        [t, isActive],
    );
    const classNames = useMemo(
        () => ['round_icon', isActive ? 'bg__success' : ''],
        [isActive],
    );

    return (
        <div className={cx('center')}>
            <div className={classNames.join(' ')}>{text}</div>
        </div>
    );
};
