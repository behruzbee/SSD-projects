import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';

export const setCheckedSelectedBus = (
    selectedBusId: number,
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const selected = get().selected;

    const isBusSelected = selected.find((v) => v === selectedBusId);
    if (!isBusSelected) {
        const newSelected = selected.concat(selectedBusId);
        set({selected: newSelected});
    }
};
