export const calculateTotalPage = (
    limit: number,
    totalCount: number | undefined,
) => {
    if (limit && totalCount) {
        const wholePart = parseInt((totalCount / limit).toString());
        const fractionalPart = totalCount % limit;
        return fractionalPart === 0 ? wholePart : wholePart + 1;
    } else return 0;
};
