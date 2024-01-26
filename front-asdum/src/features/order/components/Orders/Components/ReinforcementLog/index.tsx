import React from 'react';
import {Outlet} from 'react-router-dom';
import shallow from 'zustand/shallow';

import MuiPagination from '@src/shared/components/Pagination';

import {useOrderHistoryStore, useOrderStore} from '@shared/store/order';

const ReinforcementLog = () => {
    const {
        dailyOrderPage,
        dailyOrderTotalCount,
        setOrderHistoryPage,
        monthlyOrderTotalCount,
        monthlyOrderPage,
    } = useOrderHistoryStore((state) => ({...state}), shallow);
    const {orderMode} = useOrderStore((state) => state);

    return (
        <>
            <Outlet />
            <div className="pageWrapper2">
                <MuiPagination
                    onChange={(page) => setOrderHistoryPage(orderMode, page)}
                    totalCount={
                        orderMode === 'daily'
                            ? dailyOrderTotalCount
                            : monthlyOrderTotalCount
                    }
                    currentPage={
                        orderMode === 'daily'
                            ? dailyOrderPage
                            : monthlyOrderPage
                    }
                    disabled={
                        orderMode === 'daily'
                            ? dailyOrderTotalCount == dailyOrderPage
                            : monthlyOrderTotalCount == monthlyOrderPage
                    }
                />
            </div>
        </>
    );
};

export default ReinforcementLog;
