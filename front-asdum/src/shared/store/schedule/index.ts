import create, {SetState} from 'zustand';

import {IBusSchedule, IScheduleData, Kpps} from './fakeData';

export interface ISchedule {
    origData: IBusSchedule[];
    grouped: Array<Array<any>>;
    openM: boolean;
    step: number;
    id: number;
    stepData: any;
    shPage: number;
    shTotalCount: number;
    update: boolean;
    selectedScheduleIds: Array<number>;
    addGraphicData: IScheduleData[];
    setAddGraphicData: () => void;
    clearAddedGraphicData: () => void;
    setSelectedScheduleIds: (payload: Array<any>) => void;
    setUpdate: (update: boolean) => void;
    setShTotalCount: (shTotalCount: number) => void;
    setShPage: (page: number) => void;
    clearStep: () => void;
    setStepData: (data: any) => void;
    updateStepData: (data: any) => void;
    setId: (id: number) => void;
    setStep: (step: number) => void;
    setOpenM: (openM: boolean) => void;
    setOrigData: (payload: IBusSchedule) => void;
    setGrouped: (payload: any[]) => void;
    setUpdStep: (data: any) => void;
    clearSchedule: () => void;
}

export const useScheduleStore = create<ISchedule>(
    (set: SetState<ISchedule>) => ({
        origData: [],
        grouped: [],
        openM: false,
        step: 0,
        id: 1,
        stepData: [],
        shPage: 1,
        shTotalCount: 0,
        update: false,
        selectedScheduleIds: [],
        addGraphicData: [],
        clearAddedGraphicData: () => {
            set({addGraphicData: []});
        },
        setAddGraphicData: () => {
            const staticData: IScheduleData[] = [
                {
                    id: null,
                    day_type: 'MONDAY',
                    race_count: null,
                    garage_begin_time: null,
                    garage_end_time: null,
                    kpp_begin_time: null,
                    kpp_end_time: null,
                    kpp_begin: {} as Kpps,
                    kpp_end: {} as Kpps,
                    prostoy: null,
                    interval: null,
                    lunch1_begin: null,
                    lunch1_end: null,
                    kpp_lunch1: {} as Kpps,
                    graph_number: null,
                    lunch2_begin: null,
                    lunch2_end: null,
                    kpp_lunch2: {} as Kpps,
                },
                {
                    id: null,
                    day_type: 'OTHER',
                    race_count: null,
                    garage_begin_time: null,
                    garage_end_time: null,
                    kpp_begin_time: null,
                    kpp_end_time: null,
                    kpp_begin: {} as Kpps,
                    kpp_end: {} as Kpps,
                    prostoy: null,
                    interval: null,
                    lunch1_begin: null,
                    lunch1_end: null,
                    kpp_lunch1: {} as Kpps,
                    graph_number: null,
                    lunch2_begin: null,
                    lunch2_end: null,
                    kpp_lunch2: {} as Kpps,
                },
                {
                    id: null,
                    day_type: 'SATURDAY',
                    race_count: null,
                    garage_begin_time: null,
                    garage_end_time: null,
                    kpp_begin_time: null,
                    kpp_end_time: null,
                    kpp_begin: {} as Kpps,
                    kpp_end: {} as Kpps,
                    prostoy: null,
                    interval: null,
                    lunch1_begin: null,
                    lunch1_end: null,
                    kpp_lunch1: {} as Kpps,
                    graph_number: null,
                    lunch2_begin: null,
                    lunch2_end: null,
                    kpp_lunch2: {} as Kpps,
                },
                {
                    race_count: null,
                    garage_begin_time: null,
                    garage_end_time: null,
                    kpp_begin_time: null,
                    kpp_end_time: null,
                    kpp_begin: {} as Kpps,
                    kpp_end: {} as Kpps,
                    prostoy: null,
                    interval: null,
                    lunch1_begin: null,
                    lunch1_end: null,
                    kpp_lunch1: {} as Kpps,
                    graph_number: null,
                    lunch2_begin: null,
                    lunch2_end: null,
                    kpp_lunch2: {} as Kpps,
                    id: null,
                    day_type: 'SUNDAY',
                },
            ];
            set({addGraphicData: staticData});
        },
        setSelectedScheduleIds: (payload) => {
            const selectedIds = payload.map((graphic) => graphic['id']);
            set({selectedScheduleIds: selectedIds});
        },
        updateStepData: (data: any) => {
            set((state) => ({...state, stepData: data}));
        },
        setUpdate: (update: boolean) => set((state) => ({...state, update})),
        setUpdStep: (data) => {
            set(() => ({stepData: data}));
        },
        setShTotalCount: (shTotalCount: number) =>
            set((state) => ({...state, shTotalCount})),
        setShPage: (page: number) => set(() => ({shPage: page})),
        setStepData: (payload) =>
            set((state) => ({
                ...state,
                stepData: [...state.stepData, payload],
            })),

        clearStep: () => set((state) => ({...state, stepData: []})),
        setId: (id: number) => set({id}),
        setStep: (step: number) => set({step}),
        setOpenM: (openM: boolean) => set({openM}),
        clearSchedule: () => {
            set({
                grouped: [],
                origData: [],
                selectedScheduleIds: [],
            });
        },
        setGrouped: (grouped) => {
            set({grouped});
        },
        setOrigData: (payload): void => {
            set((state) => {
                return {
                    origData: [
                        ...state.origData,
                        {id: payload.id, days: payload.days},
                    ],
                };
            });
        },
    }),
);
