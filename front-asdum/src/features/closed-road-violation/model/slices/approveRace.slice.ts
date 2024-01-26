import {StateCreator} from 'zustand';

import {
    IApproveRaceActions,
    IApproveRaceState,
} from '../closed-road-violation.types';

export const initialApprove: IApproveRaceState = {
    approveRace: {status: 'default', description: null},
    selectedApprove: null,
};
export const createApproveRaceSlice: StateCreator<
    IApproveRaceActions & IApproveRaceState
> = (set, get) => ({
    ...initialApprove,
    setApproveRace: (type, data) => {
        const approveData = get().approveRace;
        if (type === 'status') {
            set({approveRace: {...approveData, status: data}});
        }

        if (type === 'description') {
            set({approveRace: {...approveData, description: data as string}});
        }
    },
    resetStatus: () => {
        const {approveRace, selectedApprove} = initialApprove;
        set({approveRace, selectedApprove});
    },
    setSelectedApprove: (selectedApprove) => {
        set({selectedApprove});
    },
});
