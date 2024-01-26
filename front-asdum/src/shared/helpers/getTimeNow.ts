let i = 0;
export const getTimeNow = (): number => {
    i++;
    return Date.now() + i;
};
