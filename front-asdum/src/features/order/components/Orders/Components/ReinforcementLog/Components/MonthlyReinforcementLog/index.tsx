import React from 'react';
import shallow from 'zustand/shallow';

import {useStationsHistory} from '@api/station/hooks';
import {dateToString} from '@shared/helpers/format-date';
import DataLoading from '@shared/hoc/DataLoading';
import {useOrderHistoryStore, useOrderStore} from '@shared/store/order';

import {OrdersBox} from '../../../OrdersBox';

export const MonthlyReinforcementLog = () => {
    const {routeId, selectedRange} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );
    const {monthlyOrderHistory} = useOrderHistoryStore(
        (state) => ({...state}),
        shallow,
    );
    const {isFetching} = useStationsHistory(
        routeId,
        dateToString(selectedRange?.from),
        dateToString(selectedRange?.to),
        true,
        1,
        10,
        'monthly',
    );
    return (
        <DataLoading loading={isFetching} data={monthlyOrderHistory}>
            <OrdersBox data={monthlyOrderHistory} type={'log'} />
        </DataLoading>
    );
};
