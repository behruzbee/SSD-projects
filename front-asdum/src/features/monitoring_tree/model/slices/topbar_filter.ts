import {StateCreator} from 'zustand';

import {IBusCoords} from '@models/monitoring/bus-coords';

import {MonitoringState} from '../lib/store-types';

type BusStatus =
    | 'inline'
    | 'inactiveexit'
    | 'notinlineexit'
    | 'inactivegarage'
    | 'ingarage'
    | 'inrepair'
    | 'offroute';

export interface TopBarFilterSlice {
    inline: number;
    inactiveexit: number;
    notinlineexit: number;
    ingarage: number;
    inrepair: number;
    inactivegarage: number;
    offroute: number;
    inlineChecked: boolean;
    inactiveexitChecked: boolean;
    notinlineexitChecked: boolean;
    ingarageChecked: boolean;
    inrepairChecked: boolean;
    inactivegarageChecked: boolean;
    offrouteChecked: boolean;
    routeLinesChecked: boolean;
    stationsChecked: boolean;
    filterStations: (stationsChecked: boolean) => void;
    getSelectedStatusBusIds: (status: BusStatus) => number[];
    filterRouteLines: (checked: boolean) => void;
    filterRouteLinesOnFetch: () => void;
    filterBuses: (checked: boolean, status: BusStatus) => void;
    filterBusesByStatus: (isChecked: boolean, status: BusStatus) => void;
    filterBusesOnFetch: () => void;
}

export const createTopBarFilterSlice: StateCreator<
    TopBarFilterSlice & Partial<MonitoringState>
> = (set, get) => ({
    inline: 0,
    inactiveexit: 0,
    notinlineexit: 0,
    ingarage: 0,
    inrepair: 0,
    inactivegarage: 0,
    offroute: 0,
    inlineChecked: true,
    inactiveexitChecked: true,
    notinlineexitChecked: true,
    ingarageChecked: true,
    inrepairChecked: true,
    inactivegarageChecked: true,
    offrouteChecked: true,
    routeLinesChecked: true,
    stationsChecked: false,
    getSelectedStatusBusIds: (status) => {
        const uniqueSelected = get().selectedUniqueId;
        const buses = get().normalizedData?.entities.buses ?? {};
        const selectedStatusBusIds = Object.entries(buses)
            .filter(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([_, bus]) =>
                    uniqueSelected?.some((id) => id === bus.unique_id) &&
                    //@ts-ignore
                    bus.status === status,
            )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([_, b]) => b.id);
        return selectedStatusBusIds;
    },
    filterBuses: (checked, status) => {
        const filteredBuses = get().filteredBuses as IBusCoords[];
        const selectedStatusBusIds = get().getSelectedStatusBusIds(status);
        if (!checked && selectedStatusBusIds.length) {
            const newFilteredBuses = filteredBuses.filter(
                (bus) => !selectedStatusBusIds.includes(bus.bus_id),
            );
            set({filteredBuses: newFilteredBuses});
        } else {
            const busesCoords = get().busesCoords;
            if (busesCoords) {
                const notVisibleBuses = busesCoords.filter((bus) =>
                    selectedStatusBusIds.includes(bus.bus_id),
                );
                const newFilteredBuses = filteredBuses.concat(notVisibleBuses);
                set({filteredBuses: newFilteredBuses});
            }
        }
    },
    filterBusesByStatus: (isChecked, status) => {
        const filterBuses = get().filterBuses;
        switch (status) {
            case 'inline':
                set({inlineChecked: isChecked});
                filterBuses(isChecked, 'inline');
                break;
            case 'inactiveexit':
                set({inactiveexitChecked: isChecked});
                filterBuses(isChecked, 'inactiveexit');
                break;
            case 'notinlineexit':
                set({notinlineexitChecked: isChecked});
                filterBuses(isChecked, 'notinlineexit');
                break;
            case 'inactivegarage':
                set({inactivegarageChecked: isChecked});
                filterBuses(isChecked, 'inactivegarage');
                break;
            case 'ingarage':
                set({ingarageChecked: isChecked});
                filterBuses(isChecked, 'ingarage');
                break;
            case 'inrepair':
                set({inrepairChecked: isChecked});
                filterBuses(isChecked, 'inrepair');
                break;
            default:
                set({offrouteChecked: isChecked});
                filterBuses(isChecked, 'offroute');
        }
    },
    filterBusesOnFetch: () => {
        const inlineChecked = get().inlineChecked;
        const inactiveexitChecked = get().inactiveexitChecked;
        const notinlineexitChecked = get().notinlineexitChecked;
        const ingarageChecked = get().ingarageChecked;
        const inrepairChecked = get().inrepairChecked;
        const inactivegarageChecked = get().inactivegarageChecked;
        const offrouteChecked = get().offrouteChecked;

        const inline = get().getSelectedStatusBusIds('inline').length;
        const inactiveexit =
            get().getSelectedStatusBusIds('inactiveexit').length;
        const notinlineexit =
            get().getSelectedStatusBusIds('notinlineexit').length;
        const ingarage = get().getSelectedStatusBusIds('ingarage').length;
        const inactivegarage =
            get().getSelectedStatusBusIds('inactivegarage').length;
        const inrepair = get().getSelectedStatusBusIds('inrepair').length;
        const offroute = get().getSelectedStatusBusIds('offroute').length;

        set({
            inline,
            inactiveexit,
            notinlineexit,
            ingarage,
            inactivegarage,
            inrepair,
            offroute,
        });

        if (!inlineChecked) {
            get().filterBuses(inlineChecked, 'inline');
        }
        if (!inactiveexitChecked) {
            get().filterBuses(inactiveexitChecked, 'inactiveexit');
        }
        if (!notinlineexitChecked) {
            get().filterBuses(notinlineexitChecked, 'notinlineexit');
        }
        if (!ingarageChecked) {
            get().filterBuses(ingarageChecked, 'ingarage');
        }
        if (!inrepairChecked) {
            get().filterBuses(inrepairChecked, 'inrepair');
        }
        if (!inactivegarageChecked) {
            get().filterBuses(inactivegarageChecked, 'inactivegarage');
        }
        if (!offrouteChecked) {
            get().filterBuses(offrouteChecked, 'offroute');
        }
    },
    filterRouteLines: (routeLinesChecked) => {
        set({routeLinesChecked});
        const setFilteredRoutes = get().setFilteredRoutes;

        if (!routeLinesChecked) {
            set({filteredRoutes: []});
            setFilteredRoutes && setFilteredRoutes();
        } else {
            setFilteredRoutes && setFilteredRoutes();
        }
    },
    filterStations: (stationsChecked) => {
        set({stationsChecked});
        const setFilteredStations = get().setFilterdStations;
        setFilteredStations?.();
        // if (!stationsChecked) {
        //     set({filteredStationCoords: []});
        // } else {
        //     const setFilteredStations = get().setFilterdStations;
        //     setFilteredStations?.();
        // }
    },
    filterRouteLinesOnFetch: () => {
        const routeLinesChecked = get().routeLinesChecked;
        if (!routeLinesChecked) {
            set({filteredRoutes: []});
        }
    },
});
