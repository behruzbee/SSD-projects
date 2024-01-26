import create, {GetState, SetState} from 'zustand';

import {SelectOptions} from '@models/select_options_model';
import {IAccordeonList, ITrackerData} from '@models/tracker_statistics_model';
import {addZero} from '@shared/helpers/addZero';

import {months} from './data';

interface ITrackerStatistics {
    accordeonList: Array<IAccordeonList>;
    trackerLostData: Array<ITrackerData>;
    expanded: false | string;
    selectedParkId: number | null;
    selectedRouteId: {routeId: number | null; detailsDate: string};
    trackerTableColumns: Array<string>;
    defaultMonth: any;
    monthsArr: any[];
    dateRange: {from: string | null; to: string | null};
    fullYear: number;
    getMonth: number;
    selectedParkData: IAccordeonList | null;
    clearData: () => void;
    setSelectedParkData: (payload: IAccordeonList) => void;
    setSelectedMonth: (payload: SelectOptions) => void;
    transformDate: (year: number, month: number, day: number) => string;
    setDateRange: (payload: number) => void;
    setSelectedRouteId: (
        routeId: number | null,
        detailsDate: Array<string>,
    ) => void;

    setTrackerWithDetail: (payload: number | null) => void;
    setTrackerTableColumns: (payload: any[]) => void;
    setTrackerLostData: (payload: Array<ITrackerData>) => void;
    setSelectedId: (payload: number | null) => void;
    setAccordeonList: (payload: IAccordeonList[]) => void;
    setExpanded: (payload: string | false) => void;
    textChecker: (payload: string | null | number) => string | number;
}

export const trackerStatisticsStore = create<ITrackerStatistics>(
    (set: SetState<ITrackerStatistics>, get: GetState<ITrackerStatistics>) => {
        const currentData = new Date();
        const fullYear = currentData.getFullYear();
        const getMonth = currentData.getMonth();
        return {
            accordeonList: [],
            trackerLostData: [],
            expanded: false,
            selectedParkId: null,
            selectedRouteId: {routeId: null, detailsDate: ''},
            trackerTableColumns: [],
            monthsArr: months,
            fullYear: new Date().getFullYear(),
            getMonth: new Date().getMonth(),
            defaultMonth: months[new Date().getMonth()],
            selectedParkData: null,
            clearData: () => {
                get().setAccordeonList([]);
                get().setTrackerLostData([]);
                get().setExpanded(false);
            },
            setSelectedParkData: (payload) => {
                set({selectedParkData: payload});
            },
            setSelectedMonth: (payload) => {
                set({defaultMonth: payload});
            },
            transformDate: (year, month, day) => {
                return `${year}-${addZero(month)}-${addZero(day)}`;
            },
            dateRange: {
                from: `${fullYear}-${addZero(
                    months[getMonth].value + 1,
                )}-${addZero(1)}`,
                to: `${fullYear}-${addZero(
                    months[getMonth].value + 1,
                )}-${addZero(
                    new Date(fullYear, months[getMonth].value + 1, 0).getDate(),
                )}`,
            },
            setDateRange: (payload) => {
                const date = new Date();
                const fullYear = date.getFullYear();
                const preDateRange = {
                    from: get().transformDate(fullYear, payload, 1),
                    to: get().transformDate(
                        fullYear,
                        payload,
                        new Date(fullYear, payload, 0).getDate(),
                    ),
                };
                set({dateRange: preDateRange});
            },
            setSelectedRouteId: (routeId, arr) => {
                const date = arr
                    .filter((item) => item !== 'id' && item !== 'gos_no')
                    .join('');
                set({selectedRouteId: {routeId: routeId, detailsDate: date}});
            },
            setTrackerTableColumns: (payload) => {
                const columns: Array<string> = [];
                payload.forEach((item) => {
                    Object.keys(item).forEach((key) => {
                        if (!columns.includes(key)) {
                            columns.push(key);
                        }
                    });
                });

                set({trackerTableColumns: columns});
            },
            setTrackerLostData: (payload) => {
                set({trackerLostData: payload});
                get().setTrackerTableColumns(payload);
            },
            setTrackerWithDetail: () => {
                set({});
            },
            setSelectedId: (payload) => {
                set({selectedParkId: payload});
            },
            setAccordeonList: (payload) => {
                set({accordeonList: payload});
            },
            setExpanded: (payload) => {
                set({expanded: payload});
            },
            textChecker: (payload) => (payload ? payload : '-'),
        };
    },
);
