import {StateCreator} from 'zustand';

import {IBulKppData, IBulrace} from '@models/bul_model';

export interface IBulRaceSlice {
    isBulRaceHave: () => boolean;
    bulRaceKpp1: IBulKppData[];
    bulRaceKpp2: IBulKppData[];
    bulRaceInfo: IBulrace | null;
    setBulRaceData: (payload: any) => void;
}

export const createBulRaceSlice: StateCreator<IBulRaceSlice> = (set, get) => ({
    bulRaceKpp1: [],
    bulRaceKpp2: [],
    bulRaceInfo: null,
    isBulRaceHave: () => {
        const bulDatas = [...get().bulRaceKpp1, ...get().bulRaceKpp2];
        return !!bulDatas.length;
    },
    setBulRaceData: (payload) => {
        if (payload['reys']) {
            set({
                bulRaceKpp1: payload['reys']['reys_kpp1'],
                bulRaceKpp2: payload['reys']['reys_kpp2'],
            });
        }
        if (payload['reys_info']) {
            set({bulRaceInfo: payload['reys_info']});
        }
    },
});
