import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DataLoading from '@src/shared/hoc/DataLoading';

import usePark from '@api/park/useParkQuery';
import RouteItem from '@components/RouteItem';
import {useDiffNormStore} from '@store/race_fuel';

import styles from './index.module.scss';

const ParkList: FC = () => {
    console.log('Render koef parks');
    const {t} = useTranslation();
    const {isLoading} = usePark();
    const [park_id, setParkId, parkList] = useDiffNormStore(
        (s) => [s.park_id, s.setParkId, s.koefParkList],
        shallow,
    );

    return (
        <div className="order__side">
            <div className="park__list">
                <div className="park__list__head">
                    <h4>{t('auto_parks')}</h4>
                </div>
                <DataLoading loading={isLoading} data={parkList}>
                    <div className={styles.container}>
                        {parkList?.map((route) => (
                            <RouteItem
                                key={route.park_id}
                                handleId={() => setParkId(route)}
                                selected={park_id === route.park_id}
                                id={route.park_id}
                                name={route.park}
                            />
                        ))}
                    </div>
                </DataLoading>
            </div>
        </div>
    );
};

export default ParkList;
