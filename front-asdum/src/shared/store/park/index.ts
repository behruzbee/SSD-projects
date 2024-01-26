import produce from 'immer';
import create, {SetState} from 'zustand';

import {IGarageModel, IParkModel, ISingleparkModel} from '@models/park_model';

interface IPark {
    parks: IParkModel[];
    parkTotalCount: number;
    page: number;
    term: string;
    coords: any[];
    parkData: Partial<ISingleparkModel>;
    garagePark: IGarageModel[];
    modal: boolean;
    toggleModal: () => void;
    setGaragePark: (payload: IGarageModel[]) => void;
    setParkData: (payload: ISingleparkModel) => void;
    setCoords: (coords: any[]) => void;
    setTerm: (term: string) => void;
    setPage: (payload: number) => void;
    setParkTotal: (payload: number) => void;
    setSearchParks: (payload: any) => void;
    setParks: (payload: IParkModel[]) => void;
}

export const useParkStore = create<IPark>((set: SetState<IPark>, get) => ({
    parks: [],
    parkTotalCount: 0,
    page: 1,
    term: '',
    coords: [],
    searchTerm: '',
    parkData: {},
    garagePark: [],
    modal: false,
    toggleModal: () => {
        set({modal: !get().modal});
    },
    setGaragePark: (garagePark) => set({garagePark}),
    setParkData: (parkData) => set(() => ({parkData})),
    setCoords: (coords) => set(() => ({coords})),
    setPage: (page) => set(() => ({page})),
    setParkTotal: (parkTotalCount) => set(() => ({parkTotalCount})),
    setSearchParks: (parks) => set(() => ({parks})),
    setTerm: (term) => set(() => ({term})),
    setParks: (parks) => set(produce(() => ({parks}))),
}));
