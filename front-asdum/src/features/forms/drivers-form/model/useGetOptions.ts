const transformedData = (arr: any[], type: string) => {
    if (type === 'park') {
        return arr.map((item) => ({
            label: item['park'],
            value: item['park_id'],
        }));
    } else {
        return arr.map((item) => ({
            label: item['name'],
            value: item['id'],
        }));
    }
};

export function useGetOptions(data: any[], type: string) {
    return transformedData(data, type);
}
