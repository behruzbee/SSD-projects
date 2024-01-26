import {StateCreator} from 'zustand';

import {IBusCoords} from '@models/monitoring/bus-coords';

interface IMonitoringSidebarSlice {
    sidebarSelectedBus: IBusCoords | null;
    isSidebarOpen: boolean;
}

interface IMonitoringSidebarActions {
    setClickedSidebarBus: (payload: IBusCoords | null) => void;
    updateSidebarData: (payload: IBusCoords[]) => void;
    toggleSidebar: (payload: boolean) => void;
}

export type MonitoringSidebarStore = IMonitoringSidebarActions &
    IMonitoringSidebarSlice;
export const createMonitoringSidebarSlice: StateCreator<
    MonitoringSidebarStore
> = (set, get) => ({
    isSidebarOpen: false,
    sidebarSelectedBus: null,
    updateSidebarData: (data) => {
        const selectedSidebarData = get().sidebarSelectedBus;
        const sidebarOpen = get().isSidebarOpen;
        if (sidebarOpen && selectedSidebarData) {
            const founded = data.find(
                (el) => el.unique_id === selectedSidebarData.unique_id,
            );
            founded && get().setClickedSidebarBus(founded);
        }
    },
    setClickedSidebarBus: (sidebarSelectedBus) => {
        set({sidebarSelectedBus});
    },
    toggleSidebar: (open) => {
        set({isSidebarOpen: open});
    },
});
