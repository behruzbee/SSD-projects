import {GetMonitoringState, SetMonitoringState} from '../lib/store-types';

export const setBusCenter = (
    set: SetMonitoringState,
    get: GetMonitoringState,
) => {
    const {selectedBus, map} = get();
    const busCoords = get().filteredBuses.find(
        (bus) => bus.bus_id === selectedBus?.id,
    );
    if (busCoords && map) {
        const founded = get().filteredBuses.find(
            (el) => el.unique_id === busCoords.unique_id,
        );
        if (founded && get().isSidebarOpen) {
            get().setClickedSidebarBus(founded);
        }
        set({selectedBusCoords: busCoords});
        map.setView([busCoords.lat, busCoords.lng], 17);
    }
};
