export const sortArray = <T>(
    arr: T[],
    key?: keyof T,
    type?: 'asc' | 'desc',
): T[] => {
    if (key) {
        switch (type) {
            case 'asc':
                return arr.sort((a, b) => +a[key] - +b[key]);
            case 'desc':
                return arr.sort((a, b) => +b[key] - +a[key]);
            default:
                return arr.sort((a, b) => +a[key] - +b[key]);
        }
    } else {
        switch (type) {
            case 'asc':
                return arr.sort();
            case 'desc':
                return arr.sort((a, b) => +b - +a);
            default:
                return arr.sort();
        }
    }
};
