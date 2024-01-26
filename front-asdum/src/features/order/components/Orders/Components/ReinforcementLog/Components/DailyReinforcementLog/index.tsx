import React from 'react';
import shallow from 'zustand/shallow';

import {useStationsHistory} from '@api/station/hooks';
import {dateToString} from '@shared/helpers/format-date';
import DataLoading from '@shared/hoc/DataLoading';
import {useOrderHistoryStore, useOrderStore} from '@shared/store/order';

import {OrdersBox} from '../../../OrdersBox';

export const DailyReinforcementLog = () => {
    const {routeId, selectedRange} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );
    const {dailyOrderHistory, dailyOrderPage} = useOrderHistoryStore(
        (state) => ({...state}),
        shallow,
    );
    const {isFetching} = useStationsHistory(
        routeId,
        dateToString(selectedRange?.from),
        dateToString(selectedRange?.to),
        false,
        dailyOrderPage,
        10,
        'daily',
    );

    return (
        <DataLoading loading={isFetching} data={dailyOrderHistory}>
            <OrdersBox data={dailyOrderHistory} type={'log'} />
        </DataLoading>
    );
};
