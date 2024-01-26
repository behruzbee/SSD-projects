import dayjs from 'dayjs';

export const getDate = (date: string | number): string => {
    if (typeof date === 'string') return date.slice(0, 10);
    if (typeof date === 'number') return dayjs(date).format('YYYY-MM-DD');
    return '';
};
