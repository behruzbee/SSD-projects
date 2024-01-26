import dayjs from 'dayjs';

export const timeParser = (time: number | undefined | Date, format: string) => {
    if (time && typeof time === 'number') {
        if (time < 0) {
            return '-' + dayjs(Math.abs(time)).format(format);
        } else {
            return dayjs(time).format(format);
        }
    } else if (time && typeof time !== 'number') {
        return dayjs(time).format(format);
    }

    return '';
};
export const minuteParser = (time: number | undefined | Date) => {
    if (time && typeof time === 'number') {
        if (time < 0) {
            return (
                '-' +
                dayjs()
                    .startOf('day')
                    .add(Math.abs(time), 'minute')
                    .format('HH:mm:ss')
            );
        } else {
            return dayjs()
                .startOf('day')
                .add(time, 'minute')
                .format('HH:mm:ss');
        }
    } else if (time && typeof time !== 'number') {
        return new Date(time);
    }

    return '';
};
