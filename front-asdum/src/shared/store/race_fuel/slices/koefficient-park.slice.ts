import {StateCreator} from 'zustand';

import {IParkModel} from '@models/park_model';

export interface IKoefficientParkSlice {
    setPark: (payload: Array<IParkModel>) => void;
    selectedPark: IParkModel;
    koefParkList: Array<IParkModel>;
    park_id: number;
    setParkId: (park: IParkModel) => void;
}

export const createKoefficientParkSlice: StateCreator<IKoefficientParkSlice> = (
    set,
) => ({
    park_id: NaN,
    selectedPark: {} as IParkModel,
    koefParkList: [],
    setPark: (parks) => {
        const sortedParks = [...parks].sort(
            (a, b) => parseInt(a.park) - parseInt(b.park),
        );
        set({
            koefParkList: sortedParks,
            park_id: sortedParks[0].park_id,
            selectedPark: sortedParks[0],
        });
    },
    setParkId: (park) => {
        set({park_id: park.park_id, selectedPark: park});
    },
});
