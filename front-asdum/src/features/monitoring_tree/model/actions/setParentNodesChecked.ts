import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';
import {getParentRouteAndPark} from './getParentRouteAndPark';

export const setParentNodesChecked = (
    busId: number,
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const selected = get().selected;
    const {parentRoute, parentPark} = getParentRouteAndPark(busId, get);
    let ids: number[] = [];
    if (parentRoute && parentPark) {
        const isRouteSelected = selected.includes(parentRoute.id);
        const isParkSelected = selected.includes(parentPark.id);

        if (!isRouteSelected) {
            ids = [parentRoute.id];
        }
        if (!isParkSelected) {
            ids = ids.concat([parentPark.id]);
        }

        if (ids.length > 0) {
            const newSelected = selected.concat(ids);
            set({selected: newSelected});
        }
    }
};
