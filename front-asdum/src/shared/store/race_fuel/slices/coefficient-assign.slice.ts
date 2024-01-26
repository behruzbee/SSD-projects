import {DateRange} from 'react-day-picker';
import {StateCreator} from 'zustand';

import {CoefModel} from '@models/diff_norm_models';
import {SelectOptions} from '@models/select_options_model';

export interface ICoefficientSlice {
    coefList: CoefModel[];
    coefDateRange: DateRange | undefined;
    koefficientOptions: Array<SelectOptions>;
    selectedKoefOption: SelectOptions<number>;
    handleChangeKoef: (e: SelectOptions<number>) => void;
    setKoefficientOptions: (payload: Array<CoefModel>) => void;
    setCoefDateRange: (payload: DateRange) => void;
    isCoefOpen: boolean;
    selectedKoef: CoefModel;
    setCoefList: (coefList: CoefModel[]) => void;
    setSelectedKoef: (payload: CoefModel) => void;
    setCoefOpen: () => void;
    clearKoefStore: () => void;
}

export const createCoefficientAssignSlice: StateCreator<ICoefficientSlice> = (
    set,
    get,
) => ({
    coefList: [],
    koefficientOptions: [],
    coefDateRange: undefined,
    isCoefOpen: false,
    selectedKoef: {} as CoefModel,
    selectedKoefOption: {} as SelectOptions<number>,
    handleChangeKoef: (e) => {
        set({selectedKoefOption: e});
    },
    setKoefficientOptions: (payload) => {
        const options: Array<SelectOptions<number>> = payload.map((item) => ({
            label: item.coefficient.toString(),
            value: item.id,
        }));
        set({koefficientOptions: options});
    },
    setCoefDateRange: (payload) => {
        set({coefDateRange: payload});
    },
    setSelectedKoef: (payload) => {
        set({selectedKoef: payload});
    },
    clearKoefStore: () => {
        set({selectedKoef: {} as CoefModel});
    },
    setCoefList: (coefList) => {
        set({coefList});
        get().setKoefficientOptions(coefList);
    },
    setCoefOpen: () => set((state) => ({isCoefOpen: !state.isCoefOpen})),
});
