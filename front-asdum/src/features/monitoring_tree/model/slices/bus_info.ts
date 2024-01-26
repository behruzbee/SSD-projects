import LeafletDriftMarker from 'leaflet-drift-marker';
import {MutableRefObject} from 'react';
import {StateCreator} from 'zustand';

import {IBusInfo} from '@models/monitoring/bus_info';
import {IBusCoords} from '@models/monitoring/bus-coords';

export interface BusInfoSlice {
    busInfoArray: IBusInfo[];
    busInfo: IBusInfo | null;
    busInfoLoading: boolean;
    selectedRef: LeafletDriftMarker | null;
    clickedBus: IBusCoords;
    setPopupContent: (payload: string) => string;
    setSelectedRef: (ref: LeafletDriftMarker | null) => void;
    togglePopup: (
        payload: MutableRefObject<LeafletDriftMarker | null>,
        bus: IBusCoords,
    ) => void;
    sidebarSelectedBus?: IBusCoords | null;
    handleBusClick: (clickedBus: IBusCoords) => Promise<void>;
    toggleSidebar?: (payload: boolean) => void;
    selectedBusCoords?: IBusCoords | null;
    clearBusCoords: () => void;
}

export const createBusInfoSlice: StateCreator<BusInfoSlice> = (set, get) => ({
    busInfo: null,
    busInfoArray: [],
    clickedBus: {} as IBusCoords,
    busInfoLoading: false,
    selectedRef: null,
    setSelectedRef: (ref) => {
        console.log('Set ref');
        set({selectedRef: ref});
    },
    handleBusClick: async (clickedBus) => {
        const toggleSidebar = get().toggleSidebar;
        set({
            busInfo: null,
            clickedBus,
            sidebarSelectedBus: clickedBus,
            selectedBusCoords: clickedBus,
        });
        toggleSidebar?.(true);
    },
    setPopupContent: (gos_no) => {
        return `                    
                    <div class=busInfoWrapper>
                        <div class=busInfo>
                            <span class=value>${gos_no}</span>
                        </div>
                    </div>`;
    },
    clearBusCoords: () => {
        set({selectedBusCoords: null});
    },
    togglePopup: (markerRef, bus) => {
        if (markerRef?.current) {
            if (
                get().selectedBusCoords?.unique_id === bus?.unique_id &&
                !get().selectedRef
            ) {
                get().setSelectedRef(markerRef?.current);
                markerRef?.current?.openPopup();
                markerRef?.current?.setPopupContent(
                    get().setPopupContent(bus['gos_no']),
                );
            }
        }
    },
});
