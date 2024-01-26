export const summator = <T>(
    toBeCalculatedColumns: Array<T>,
    tableData: T[],
): Array<number> => {
    const totalSumArr: Array<number> = [];
    toBeCalculatedColumns.forEach((item) => {
        const summator = tableData.reduce((acc, nextValue: any) => {
            if (nextValue[item] && typeof nextValue[item] === 'number') {
                return acc + nextValue[item];
            }
            return acc + 0;
        }, 0);
        totalSumArr.push(summator);
    });
    return totalSumArr;
};
