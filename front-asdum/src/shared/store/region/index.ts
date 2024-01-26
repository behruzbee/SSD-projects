import produce from 'immer';
import create, {SetState} from 'zustand';

import {IRegionModel} from '@src/shared/models/region_model';

interface IRegion {
    regions: IRegionModel[];
    setRegions: (payload: IRegionModel[]) => void;
}

export const useRegionStore = create<IRegion>((set: SetState<IRegion>) => ({
    regions: [],
    setRegions: (payload): void => {
        set(produce(() => ({regions: payload})));
    },
}));
