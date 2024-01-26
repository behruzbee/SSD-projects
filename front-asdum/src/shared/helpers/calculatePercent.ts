export const calculatePercent = (plan: number, fact: number): number => {
    if (!!plan && !!fact) {
        return Math.floor(100 * (fact / plan));
    }
    return 0;
};
