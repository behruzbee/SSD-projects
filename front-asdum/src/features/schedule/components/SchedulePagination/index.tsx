import React, {useMemo} from 'react';
import shallow from 'zustand/shallow';

import MuiPagination from '@src/shared/components/Pagination';
import {useScheduleStore} from '@src/shared/store/schedule';

import {helper} from '@shared/helpers';

import styles from './index.module.scss';

const {handleTotal} = helper;

const SchedulePagination = () => {
    const {shPage, setShPage, shTotalCount} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );

    const totalCountSchedule = useMemo(
        () => handleTotal(shTotalCount),
        [shTotalCount],
    );

    const handlePagination = (value: number) => {
        setShPage(value);
    };

    return (
        <div className={styles.pageWrapper}>
            <MuiPagination
                onChange={handlePagination}
                totalCount={totalCountSchedule}
                currentPage={shPage}
                disabled={totalCountSchedule == shPage}
            />
        </div>
    );
};

export default SchedulePagination;
