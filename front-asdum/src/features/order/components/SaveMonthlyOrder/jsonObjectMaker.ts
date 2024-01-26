import dayjs from 'dayjs';
import {DateRange} from 'react-day-picker';

import {monthlyRouteExchangeModel} from '@models/route_exchange_model';

export const jsonObjectMaker = (
    data: any,
    route_id: number,
    date: DateRange | undefined,
    type: string,
) => {
    if (type === 'secondDriver') {
        return {
            ex_id: null,
            even: 0,
            route_id,
            graph_number: data.graphic.value,
            bus_fact: data.graph_number.value,
            driver_id: data.tab_num2.value,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            from_date: dayjs(date?.from).format('YYYY-MM-DD'),
            to_date: dayjs(date?.to).format('YYYY-MM-DD'),
        };
    }
    return {
        ex_id: null,
        even: 1,
        route_id,
        graph_number: data.graphic.value,
        bus_fact: data.graph_number.value,
        driver_id: data.tab_num.value,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        from_date: dayjs(date?.from).format('YYYY-MM-DD'),
        to_date: dayjs(date?.to).format('YYYY-MM-DD'),
    };
};

export const editJsonObjectMaker = (
    data: monthlyRouteExchangeModel | null,
    route_id: number,
    type: string,
    formData: any,
    date: DateRange | undefined,
) => {
    console.log('Form data: ', formData);

    if (type === 'secondDriver') {
        return {
            ex_id: data?.second_ex_id,
            even: 0,
            route_id: route_id,
            graph_number: formData?.graphic.value,
            bus_fact: formData?.graph_number?.value,
            driver_id: formData?.tab_num2?.value,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            from_date: dayjs(date?.from).format('YYYY-MM-DD'),
            to_date: dayjs(date?.to).format('YYYY-MM-DD'),
        };
    }
    return {
        ex_id: data?.first_ex_id,
        even: 1,
        route_id: route_id,
        graph_number: formData?.graphic.value,
        bus_fact: formData?.graph_number?.value,
        driver_id: formData?.tab_num?.value,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        from_date: dayjs(date?.from).format('YYYY-MM-DD'),
        to_date: dayjs(date?.to).format('YYYY-MM-DD'),
    };
};
