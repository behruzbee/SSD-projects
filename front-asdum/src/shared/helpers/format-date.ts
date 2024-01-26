import dayjs from 'dayjs';

export const formatDateInput = (date: Date | string | number | undefined) =>
    dayjs(date).format('DD.MM.YYYY');

export const dateToString = (data: Date | string | number | undefined) =>
    dayjs(data).format('YYYY-MM-DD');
