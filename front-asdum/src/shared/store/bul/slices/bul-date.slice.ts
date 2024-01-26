import dayjs from 'dayjs';
import {StateCreator} from 'zustand';

export interface IBulDateSlice {
    date: Date | undefined;
    parsedDate: string;
    setDate: (payload: Date) => void;
}

const currentDate = new Date();

export const createBulDateSlice: StateCreator<IBulDateSlice> = (set) => ({
    date: currentDate,
    parsedDate: dayjs(currentDate).format('YYYY-MM-DD'),
    setDate: (payload) => {
        set({
            parsedDate: dayjs(payload).format('YYYY-MM-DD'),
            date: payload,
        });
    },
});
