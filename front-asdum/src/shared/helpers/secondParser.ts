export const secondParser = (s: number) => {
    if (s) {
        const hour = +parseInt((s / 3600).toString()),
            minute = +parseInt(((s % 3600) / 60).toString()),
            second = +parseInt((s % 60).toString());
        return `${hour < 10 ? '0' + hour : hour}:${
            minute < 10 ? '0' + minute : minute
        }:${second < 10 ? '0' + second : second}`;
    }

    return '00:00:00';
};
