export const addZero = (value: number): string => {
    if (value < 0) {
        return Math.abs(value).toString();
    }
    return value >= 10 ? value.toString() : `0${value}`;
};
