export interface IAccordeonList {
    park_name: string;
    park_id: number;
    total_count: number;
    total_duration: string | null;
    average_duration: string | null;
}

export interface ITrackerData {
    gos_no: string;
    id: number;
}
export const fakeAccList: IAccordeonList[] = [
    {
        park_name: 'Samarkand Auto',
        park_id: 233,
        total_count: 4,
        total_duration: '15:03:19',
        average_duration: '03:45:49',
    },
    {
        park_name: 'tst5',
        park_id: 241,
        total_count: 0,
        total_duration: null,
        average_duration: null,
    },
    {
        park_name: 'tst6',
        park_id: 243,
        total_count: 0,
        total_duration: null,
        average_duration: null,
    },
    {
        park_name: 'Самарканд',
        park_id: 246,
        total_count: 0,
        total_duration: null,
        average_duration: null,
    },
];

export const fakeTrackerData: ITrackerData[] | any[] = [
    {
        gos_no: 'Sam Auto/64/1/30 024 PBA',
        id: 5145,
        '19.09.2022': 39996556,
    },
    {
        gos_no: 'Sam Auto/64/5/30 746 EBA',
        id: 5147,
        '20.09.2022': 80006238,
    },
];
