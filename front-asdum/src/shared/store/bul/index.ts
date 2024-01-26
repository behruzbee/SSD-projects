import create, {GetState, SetState} from 'zustand';

import {IBulDriverInfo} from '@models/bul_model';
import {
    IBulDateSlice,
    createBulDateSlice,
} from '@store/bul/slices/bul-date.slice';
import {
    IBulOperationsSlice,
    createBulOperationsSlice,
} from '@store/bul/slices/bul-operations.slice';
import {
    IBulPrintSlice,
    createBulPrintSlice,
} from '@store/bul/slices/bul-print.slice';
import {
    IBulRaceSlice,
    createBulRaceSlice,
} from '@store/bul/slices/bul-race.slice';
import {
    IGarageSlice,
    createGarageSlice,
} from '@store/bul/slices/garages.slices';

interface IBul {
    bulDriverInfo: IBulDriverInfo | null;
    clearBulStore: () => void;
    setBulData: (payload: any) => void;
    bulIsEmpty: Array<number>;
}

export type BulType = IBul &
    IGarageSlice &
    IBulRaceSlice &
    IBulDateSlice &
    IBulOperationsSlice &
    IBulPrintSlice;

export const useBulStore = create<BulType>(
    (set: SetState<BulType>, get: GetState<BulType>, api) => ({
        bulDriverInfo: null,
        clearBulStore: () => {
            set({
                bulRaceKpp1: [],
                bulRaceKpp2: [],
                bulRaceInfo: null,
                bulDriverInfo: null,
            });
        },
        bulIsEmpty: [],
        setBulData: (payload) => {
            get().setBulRaceData(payload);
            if (payload['driver_info']) {
                set({bulDriverInfo: payload['driver_info']});
            }
            set({
                bulIsEmpty:
                    get().bulDriverInfo || get().bulRaceInfo ? [1, 2, 3] : [],
            });
        },
        ...createGarageSlice(set, get, api),
        ...createBulRaceSlice(set, get, api),
        ...createBulDateSlice(set, get, api),
        ...createBulOperationsSlice(set, get, api),
        ...createBulPrintSlice(set, get, api),
    }),
);
