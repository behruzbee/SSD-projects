import {LoadingButton} from '@mui/lab';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {localNotification} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useKppStore} from '@store/kpp';
import {useScheduleStore} from '@store/schedule';

import IconPlusRound from '@images/svgs/IconPlusRound';

import styles from './index.module.scss';

const {notifyWarning} = localNotification;

const ScheduleAdd = () => {
    const {t} = useTranslation();
    const [setAddGraphicData, addGraphicData] = useScheduleStore(
        (s) => [s.setAddGraphicData, s.addGraphicData],
        shallow,
    );
    const kppById = useKppStore((s) => s.kppById);
    const {canEdit} = useLocationPermission('routes');

    const handleOpenModal = () => {
        if (kppById?.length > 0) {
            setAddGraphicData();
        } else {
            notifyWarning(t('noDataKpp'));
        }
    };

    return (
        <>
            {canEdit && !!!addGraphicData.length ? (
                <h2
                    className="editVehicleWrapper__subtitle"
                    style={{width: '100%'}}
                >
                    <LoadingButton
                        onClick={handleOpenModal}
                        style={{textTransform: 'none'}}
                        className={cx(styles.btn)}
                    >
                        <IconPlusRound className={styles.iconAdd} />
                        {t('add_graphic')}
                    </LoadingButton>
                </h2>
            ) : null}
        </>
    );
};

export default React.memo(ScheduleAdd);
