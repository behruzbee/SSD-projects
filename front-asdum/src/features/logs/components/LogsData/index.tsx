import React, {useMemo} from 'react';
import shallow from 'zustand/shallow';

import MuiPagination from '@components/Pagination';
import {calculateTotalPage} from '@shared/helpers/calculateTotalPage';
import {useLogsStore} from '@shared/store/logs';

import LogsTable from '../LogsTable';

const LogsData = () => {
    const {page, setPage, totalPage} = useLogsStore((state) => state, shallow);
    const totalPages = useMemo(
        () => (totalPage ? calculateTotalPage(10, totalPage) : 0),
        [totalPage],
    );

    return (
        <div className="page__body">
            <LogsTable />
            <div className="pageWrapper">
                <MuiPagination
                    onChange={setPage}
                    totalCount={totalPages}
                    currentPage={page}
                    disabled={totalPages == page}
                />
            </div>
        </div>
    );
};

export default LogsData;
