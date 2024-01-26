import {GetMonitoringState} from '../lib/store-types';

export const getParentRouteAndPark = (
    busId: number,
    get: GetMonitoringState,
) => {
    const normalizedData = get().normalizedData;
    const routes = normalizedData?.entities?.routes;
    const parks = normalizedData?.entities?.parks;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parentRoute = Object.entries(routes ?? {})?.find(([_, value]) =>
        value.children?.some((v) => v === busId),
    )?.[1];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parentPark = Object.entries(parks ?? {})?.find(([_, value]) =>
        value.children?.some((v) => v === parentRoute?.id),
    )?.[1];
    return {parentRoute, parentPark};
};
