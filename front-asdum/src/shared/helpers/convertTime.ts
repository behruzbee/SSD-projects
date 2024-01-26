import dayjs from 'dayjs';

export const convertTime = (value: number | any) => {
    if (typeof value === 'number' && value > 0) {
        return dayjs(value).format('HH:mm:ss');
    } else if (typeof value === 'number' && value < 0) {
        return '-' + dayjs(Math.abs(value)).format('HH:mm:ss');
    } else return '00:00:00';
};

export const convertToDateFormat = (value: number): any => {
    return value
        ? value < 0
            ? '-' +
              //@ts-ignore
              new Date(Math.abs(value) * 1000)
                  .toUTCString()
                  .match(/(\d\d:\d\d:\d\d)/)[0]
            : //@ts-ignore
              new Date(Math.abs(value) * 1000)
                  .toUTCString()
                  .match(/(\d\d:\d\d:\d\d)/)[0]
        : '00:00:00';
};
