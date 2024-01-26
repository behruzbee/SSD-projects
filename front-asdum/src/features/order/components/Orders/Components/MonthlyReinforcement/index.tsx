import React from 'react';

import useEmployees from '@api/employees/hooks';
import useExRouteExchange, {
    useMonthlyRouteExch,
} from '@api/route_exchange/hooks';
import DataLoading from '@shared/hoc/DataLoading';
import {useOrderStore} from '@shared/store/order';

import {MonthlyOrderBox} from '../MonthlyOrderBox';

const MonthlyOrder = () => {
    const [monthlyOrderPage, monthlyOrders] = useOrderStore((s) => [
        s.monthlyOrderPage,
        s.monthlyOrders,
    ]);
    useExRouteExchange(true);
    useEmployees(true);
    const {isFetching} = useMonthlyRouteExch(monthlyOrderPage);
    return (
        <DataLoading loading={isFetching} data={monthlyOrders}>
            <MonthlyOrderBox data={monthlyOrders} />
        </DataLoading>
    );
};

export default MonthlyOrder;
