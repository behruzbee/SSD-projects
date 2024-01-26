export const setOrderNumber = (
    currentIndex: number,
    page: number,
    size: number,
): number => {
    const prefix = (page - 1) * size;
    return prefix + currentIndex;
};
