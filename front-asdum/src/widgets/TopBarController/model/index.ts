import {ChangeEvent} from 'react';
import create from 'zustand';

import {immer} from '@shared/store/_middlewares/immer';

interface IDateTime {
    date: Date;
    setDate: (date: Date) => void;
    time: {from: string; to: string};
    setTime: (e: ChangeEvent<HTMLInputElement>) => void;
    setDefault: () => void;
}

export const useDateTimeModel = create<IDateTime>(
    immer((set) => ({
        date: new Date(),
        time: {from: '00:00', to: '23:59'},
        setDate: (date) =>
            set((state) => {
                state.date = date;
            }),
        setTime: (e) =>
            set((state) => {
                state.time[e.target.name as 'from' | 'to'] = e.target.value;
            }),
        setDefault: () =>
            set((state) => {
                state.date = new Date();
                state.time = {from: '00:00', to: '23:59'};
            }),
    })),
);
