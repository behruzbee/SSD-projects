type DistanceMode = 'km' | 'm';

export const distanceCalculator = (
    value: number,
    valueMode: DistanceMode,
    expectMode: DistanceMode,
): number => {
    if (!value) return 0;
    if (valueMode === 'm' && expectMode === 'km') {
        return +(value / 1000).toFixed(2);
    }
    if (valueMode === 'km' && expectMode === 'm') {
        return +(value * 1000).toFixed(1);
    }
    return 0;
};
