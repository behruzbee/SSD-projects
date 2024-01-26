import create from 'zustand';

import {
    IControlIntervalParams,
    IControlIntervalRaces,
    IKPPData,
    IKPPGarage,
    IViolationDataDTO,
} from '@src/shared/models/control_interval_data_model';

interface IControlInterval {
    kpp1Data: IKPPData[];
    kpp2Data: IKPPData[];
    violationData: IViolationDataDTO[];
    garages: IKPPGarage;
    queryParams: IControlIntervalParams;
    raceInfoData: IControlIntervalRaces;
    kpp1Name: string;
    kpp2Name: string;
    setViolationData: (data: IViolationDataDTO[]) => void;
    setQueryParams: (payload: IControlIntervalParams) => void;
    setKpp1Data: (payload: IKPPData[]) => void;
    setKpp2Data: (payload: IKPPData[]) => void;
    setGaragesData: (payload: IKPPGarage) => void;
    setRaceInfoData: (payload: IControlIntervalRaces) => void;
    setKppName: (payload: string, type: 'kpp1Name' | 'kpp2Name') => void;
}

export const useRaceStatisticsStore = create<IControlInterval>((set) => ({
    kpp1Data: [],
    kpp2Data: [],
    violationData: [],
    garages: {parkName: '', routeName: '', garageList: []},
    queryParams: {
        date: '',
        from_time: '',
        to_time: '',
        route_id: null,
        bus_id: 0,
    },
    raceInfoData: {
        allRaces: 0,
        early: 0,
        accepted: 0,
        fact_exit: 0,
        plan_exit: 0,
        plan_mileage: 0,
        fact_mileage: 0,
        plan_race: 0,
        nvtime: '',
        regRace: 0,
        violationRaces: 0,
        inCompletedRace: 0,
    },
    kpp1Name: '',
    kpp2Name: '',
    setViolationData: (violationData) => {
        set({violationData});
    },
    setQueryParams: (payload: IControlIntervalParams) => {
        set({queryParams: payload});
    },
    setKpp1Data: (payload: IKPPData[]) => {
        set({kpp1Data: payload});
    },
    setKpp2Data: (payload: IKPPData[]) => {
        set({kpp2Data: payload});
    },
    setGaragesData: (payload: IKPPGarage) => {
        set({garages: payload});
    },
    setRaceInfoData: (payload: IControlIntervalRaces) => {
        set({raceInfoData: payload});
    },
    setKppName: (payload: string, type: string) => {
        if (type === 'kpp1Name') {
            set({kpp1Name: payload});
        } else {
            set({kpp2Name: payload});
        }
    },
}));
