import create, {SetState} from 'zustand';

import {KppIdModel, KppModel} from '@models/kpp_models';

interface IKpp {
    kpps: KppModel[];
    kppById: KppIdModel[];
    setKppById: (payload: KppIdModel[]) => void;
    setKpps: (payload: KppModel[]) => void;
}

export const useKppStore = create<IKpp>((set: SetState<IKpp>) => ({
    kpps: [],
    kppById: [],
    setKppById: (payload) => set({kppById: payload}),
    setKpps: (payload): void => {
        set({kpps: payload});
    },
}));
