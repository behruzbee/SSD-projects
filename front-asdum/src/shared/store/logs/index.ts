import i18next from 'i18next';
import create, {SetState} from 'zustand';

import {ILogDatas} from '@models/logs_model';
import {ENTITY_TYPE} from '@shared/constants';

interface ILogs {
    logData: ILogDatas[];
    entityType: string;
    logDate: string;
    logFilter: any[];
    logSearchTerm: string;
    page: number;
    totalPage: number;
    setLogData: (payload: ILogDatas[]) => void;
    setEntityType: (payload: string) => void;
    setLogDate: (payload: string) => void;
    setLogFilter: () => void;
    setLogSearchTerm: (payload: string) => void;
    setPage: (payload: number) => void;
    setTotalPage: (payload: number) => void;
}

export const useLogsStore = create<ILogs>((set: SetState<ILogs>) => ({
    logData: [],
    entityType: '',
    logDate: '',
    logFilter: [],
    logSearchTerm: '',
    page: 1,
    totalPage: 1,
    setLogData: (payload: ILogDatas[]) => {
        set({logData: payload});
    },
    setEntityType: (payload: string) => {
        set({entityType: payload});
    },
    setLogDate: (payload: string) => {
        set({logDate: payload});
    },
    setLogFilter: () => {
        let options = Object.keys(ENTITY_TYPE)
            .map((item) => ({
                value: item,
                label: ENTITY_TYPE[item],
            }))
            .filter((item) => item.label !== '');
        options.unshift({value: '', label: i18next.t('by_default')});
        set({logFilter: options});
        i18next.on('languageChanged', function () {
            options = Object.keys(ENTITY_TYPE)
                .map((item) => ({
                    value: item,
                    label: ENTITY_TYPE[item],
                }))
                .filter((item) => item.label !== '');
            options.unshift({value: '', label: i18next.t('by_default')});
            set({logFilter: options});
        });
    },
    setLogSearchTerm: (payload: string) => {
        set({logSearchTerm: payload});
    },
    setTotalPage: (payload: number) => {
        set({totalPage: payload});
    },
    setPage: (payload: number) => {
        set({page: payload});
    },
}));
