import React, {useMemo} from 'react';
import shallow from 'zustand/shallow';

import MuiPagination from '@src/shared/components/Pagination';
import {usePolygonStore} from '@src/shared/store/polygon';

import {helper} from '@shared/helpers';

import styles from './index.module.scss';

const {handleTotal} = helper;

const PolugonPagination = () => {
    const {page, setPage, totalCount} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );

    const totalCountPolygons = useMemo(
        () => handleTotal(totalCount),
        [totalCount],
    );

    const handlePagination = (value: number) => {
        setPage(value);
    };

    return (
        <div className={styles.pageWrapper}>
            <MuiPagination
                onChange={handlePagination}
                totalCount={totalCountPolygons}
                currentPage={page}
                disabled={totalCountPolygons == page}
            />
        </div>
    );
};

export default React.memo(PolugonPagination);
