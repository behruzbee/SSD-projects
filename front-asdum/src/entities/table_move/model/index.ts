import dayjs from 'dayjs';
import create, {GetState, SetState} from 'zustand';

import {IMoveTableData, fakeData} from '../types';

interface ITableMove {
    moveTableData: IMoveTableData[];
    totalSum: Array<number>;
    toBeCalculatedColumns: Array<string>;
    setMoveTableData: (payload: IMoveTableData[]) => void;
    calculateTotalSum: () => void;
    date: Date | undefined;
    parsedDate: string;
    setDate: (payload: Date) => void;
}

const currentDate = new Date();

export const tableMoveStore = create<ITableMove>(
    (set: SetState<ITableMove>, get: GetState<ITableMove>) => ({
        moveTableData: fakeData,
        date: currentDate,
        parsedDate: dayjs(currentDate).format('YYYY-MM-DD'),
        totalSum: [],
        toBeCalculatedColumns: [
            'h6plan',
            'h6fact',
            'h6diff',
            'h8plan',
            'h8fact',
            'h8diff',
            'h9plan',
            'h9fact',
            'h9diff',
            'h14plan',
            'h14fact',
            'h14diff',
            'h15plan',
            'h15fact',
            'h15diff',
            'h17plan',
            'h17fact',
            'h17diff',
            'h19plan',
            'h19fact',
            'h19diff',
            'h21plan',
            'h21fact',
            'h21diff',
            'h22plan',
            'h22fact',
            'h22diff',
            'h23plan',
            'h23fact',
            'h23diff',
            'reysPlan',
            'reysFact',
        ],
        calculateTotalSum: () => {
            if (get().moveTableData.length) {
                const totalSumArr: Array<number> = [];
                get().toBeCalculatedColumns.forEach((item) => {
                    const summator = get().moveTableData.reduce(
                        (acc: any, nextValue: any) => {
                            return acc + nextValue[item];
                        },
                        0,
                    );
                    totalSumArr.push(summator);
                });
                set({totalSum: totalSumArr});
            }
        },
        setMoveTableData: (payload) => {
            set({moveTableData: payload});
            get().calculateTotalSum();
        },
        setDate: (payload) => {
            set({
                parsedDate: dayjs(payload).format('YYYY-MM-DD'),
                date: payload,
            });
        },
    }),
);
