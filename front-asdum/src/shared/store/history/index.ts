import create, {SetState} from 'zustand';

import {IBusListData} from '@models/history_bus_list';
import {
    IFactTrackData,
    IHistoryPolygon,
    INotInline,
    IPlanTrackData,
    IRaceList,
    ISignalLoose,
    IStationTable,
    IViolationHistory,
} from '@models/history_model';

interface IBusListStore {
    busListData: IBusListData[];
    setBusListData: (payload: IBusListData[]) => void;
}

interface IHistory {
    historyFetched: boolean;
    setHistoryFetched: (payload: boolean) => void;
    factTrackData: IFactTrackData[];
    planTrackData: IPlanTrackData[];
    signalLooseData: ISignalLoose[];
    notInlineData: INotInline[];
    mileage: number;
    raceList: IFactTrackData[];
    raceCount: IRaceList[];
    speed: any[];
    filteredSpeed: any[];
    showStations: boolean;
    showRouteLine: boolean;
    stationTable: IStationTable[];
    busLocation: number[];
    selectedRaceData: IFactTrackData[];
    centerLocation: number[];
    tableCounter: number;
    historyPolygon: IHistoryPolygon[];
    minusRacesList: Array<number>;
    violations: IViolationHistory[];
    activeButton: number;
    historyReport: string;
    setHistoryReport: (payload: string) => void;
    setSwitchRace: (
        payload: number,
        type: 'withRaceButton' | 'withViolation',
    ) => void;
    setActiveButton: (payload: number) => void;
    setFactTrack: (payload: IFactTrackData[]) => void;
    setPlanTrack: (payload: IPlanTrackData[]) => void;
    setSignalLoose: (payload: ISignalLoose[]) => void;
    setNotInline: (payload: INotInline[]) => void;
    setMileage: (payload: number) => void;
    setRaceList: (payload: IFactTrackData[]) => void;
    setRaceCount: (payload: IRaceList[]) => void;
    setSpeed: (payload: any[]) => void;
    setFilteredSpeed: (payload: any[]) => void;
    setShowStations: (payload: boolean) => void;
    setShowRouteLine: (payload: boolean) => void;
    setStationTable: (payload: IStationTable[]) => void;
    setBusLocation: (payload: number[]) => void;
    setSelectedRaceData: (payload: IFactTrackData[]) => void;
    setCenterLocation: (payload: number[]) => void;
    setTableCounter: (payload: number) => void;
    setHistoryPolygon: (payload: IHistoryPolygon[]) => void;
    setMinusRacesList: (payload: Array<number>) => void;
    clearDataStore: () => void;
    setViolations: (payload: IViolationHistory[]) => void;
    selectedBus: any;
    setSelectedBus: (payload: any) => void;
}

export const useBusListStore = create<IBusListStore>(
    (set: SetState<IBusListStore>) => ({
        busListData: [],
        setBusListData: (payload: IBusListData[]) => {
            set({busListData: payload});
        },
    }),
);

export const useHistoryDataStore = create<IHistory>(
    (set: SetState<IHistory>, get) => ({
        historyFetched: false,
        factTrackData: [],
        planTrackData: [],
        signalLooseData: [],
        notInlineData: [],
        mileage: 0,
        speed: [],
        filteredSpeed: [],
        raceList: [],
        raceCount: [],
        showRouteLine: true,
        showStations: true,
        stationTable: [],
        busLocation: [],
        selectedRaceData: [],
        centerLocation: [],
        tableCounter: 0,
        historyPolygon: [],
        minusRacesList: [],
        violations: [],
        activeButton: 0,
        historyReport: '',
        selectedBus: {},
        setHistoryFetched: (payload) => {
            set({historyFetched: payload});
        },
        setSelectedBus: (payload) => {
            set({selectedBus: payload});
        },
        setHistoryReport: (payload) => {
            set({historyReport: payload});
        },
        setSwitchRace: (id, type) => {
            const filteredLocations =
                id !== -1
                    ? get().raceCount[id]['reysList']
                    : get().factTrackData;
            get().setSelectedRaceData([]);
            get().setSelectedRaceData(filteredLocations);
            get().setFilteredSpeed(
                get().speed.filter(
                    (item) =>
                        !!filteredLocations.find(
                            (location) => location.regDateTime === item.from,
                        ),
                ),
            );
            get().setBusLocation([
                filteredLocations[0].lat,
                filteredLocations[0].lng,
            ]);
            if (type === 'withRaceButton') {
                get().setCenterLocation([
                    filteredLocations[0].lat,
                    filteredLocations[0].lng,
                ]);
            } else {
                get().setCenterLocation(get().violations[0].coordinates);
            }
            get().setActiveButton(id);
        },
        setActiveButton: (payload) => {
            set({activeButton: payload});
        },
        setFactTrack: (payload: IFactTrackData[]) => {
            set({factTrackData: payload});
        },
        setPlanTrack: (payload: IPlanTrackData[]) => {
            set({planTrackData: payload});
        },
        setSignalLoose: (payload: ISignalLoose[]) => {
            set({signalLooseData: payload});
        },
        setNotInline: (payload: INotInline[]) => {
            set({notInlineData: payload});
        },
        setMileage: (payload: number) => {
            set({mileage: payload});
        },
        setRaceList: (payload: IFactTrackData[]) => {
            set({raceList: payload});
        },
        setRaceCount: (payload: IRaceList[]) => {
            set({raceCount: payload});
        },
        setSpeed: (payload: any[]) => {
            set({speed: payload});
        },
        setFilteredSpeed: (payload) => {
            set({filteredSpeed: payload});
        },
        setShowRouteLine: (payload: boolean) => {
            set({showRouteLine: payload});
        },
        setShowStations: (payload: boolean) => {
            set({showStations: payload});
        },
        setStationTable: (payload: IStationTable[]) => {
            set({stationTable: payload});
        },
        setBusLocation: (payload: number[]) => {
            set({busLocation: payload});
        },
        setSelectedRaceData: (payload: IFactTrackData[]) => {
            set({selectedRaceData: payload});
        },
        setCenterLocation: (payload: number[]) => {
            set({centerLocation: payload});
        },
        setTableCounter: (payload: number) => {
            set({tableCounter: payload});
        },
        setHistoryPolygon: (payload: IHistoryPolygon[]) => {
            set({historyPolygon: payload});
        },
        setMinusRacesList: (payload: Array<number>) => {
            set({minusRacesList: payload});
        },
        setViolations: (payload: IViolationHistory[]) => {
            set({violations: payload});
        },
        clearDataStore: () => {
            get().setFactTrack([]);
            get().setPlanTrack([]);
            get().setBusLocation([]);
            get().setStationTable([]);
            get().setViolations([]);
        },
    }),
);
