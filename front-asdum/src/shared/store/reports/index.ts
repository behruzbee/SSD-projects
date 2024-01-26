import produce from 'immer';
import create from 'zustand';

import {IReportFilter} from '@models/filter_model';
import {IReportDataProps} from '@models/report_model';
import {
    MultiSelectChangeHandle,
    SelectOptions,
} from '@models/select_options_model';
import {getMultiSelectData} from '@views/reports/config';

import {reportTypeFilters} from './data';

interface IReportData {
    reportTypes: any;
    reportData: IReportDataProps[];
    selectedId: {
        selectedBuses: any;
        selectedTypes: any;
    };
    status: string;
    totalCount: number;
    page: number;
    size: number;
    base64PDF: IReportDataProps;
    selectItems: Array<any>;
    reportTypeFilter: IReportFilter[];
    selectedReportFilter: IReportFilter;
    value: SelectOptions[];
    multiSelectOptions: any[];
    setMultiSelectOptions: (type?: number) => void;
    changeReportType: (type: SelectOptions<number>) => void;
    setSelectedValue: MultiSelectChangeHandle;
    setReportTypeFilter: (checked: boolean, payload: IReportFilter) => void;
    setSelectItems: (payload: any) => void;
    setBase64PDF: (payload: IReportDataProps) => void;
    setTotalCount: (payload: number) => void;
    setPage: (payload: number) => void;
    setStatus: (payload: string) => void;
    setSelectedId: (payload: any, type: string) => void;
    setReportData: (payload: IReportDataProps[]) => void;
    setReportTypes: (payload: any[]) => void;
    clearReportConfig: () => void;
}

export const useReportStore = create<IReportData>((set, get) => {
    return {
        reportTypes: [],
        reportData: [],
        status: '',
        selectedId: {selectedBuses: [], selectedTypes: null},
        totalCount: 0,
        page: 1,
        size: 10,
        base64PDF: {
            gos_numbers: [],
            name: '',
            pdf_file: '',
            requested_time: '',
            user_name: '',
        },
        selectItems: [],
        reportTypeFilter: reportTypeFilters,
        selectedReportFilter: {
            isChecked: false,
            label: 'All',
            type: 'all',
            name: 'All',
        },
        value: [],
        multiSelectOptions: [],
        setMultiSelectOptions: (type) => {
            const multiSelectOptions = getMultiSelectData(type || 24);
            set({multiSelectOptions});
        },
        changeReportType: (type) => {
            get().setSelectedId(type.value, 'type');
        },
        setSelectedValue: (option) => {
            if (Array.isArray(option)) {
                const buses = option.map((bus) => bus.value);
                set({value: option});
                get().setSelectedId(buses, 'bus');
            }
        },
        setReportTypeFilter: (checked, payload) => {
            set(
                produce((draft: IReportData) => {
                    const filter = draft.reportTypeFilter.find((filter) => {
                        return filter.type === payload.type;
                    });
                    if (filter) filter.isChecked = checked;
                }),
            );

            if (checked) {
                set({selectedReportFilter: payload});
            } else {
                set({
                    selectedReportFilter: {
                        isChecked: false,
                        label: 'All',
                        type: 'all',
                        name: 'All',
                    },
                });
            }
        },
        setSelectItems: (payload) => {
            set({selectItems: payload});
        },
        setBase64PDF: (payload) => {
            set({base64PDF: payload});
        },
        setTotalCount: (payload) => {
            set({totalCount: payload});
        },
        setPage: (payload) => {
            set({page: payload});
        },
        setStatus: (payload) => {
            set({status: payload});
        },
        setSelectedId: (payload, type) => {
            if (type === 'bus' && typeof payload === 'object') {
                set({
                    selectedId: {
                        ...get().selectedId,
                        selectedBuses: payload,
                    },
                });
            } else {
                set({
                    selectedId: {
                        ...get().selectedId,
                        selectedTypes: payload,
                    },
                });
            }
        },
        setReportTypes: (payload) => {
            set({reportTypes: payload});
        },
        setReportData: (payload) => {
            set({reportData: payload});
        },
        clearReportConfig: () => {
            set({totalCount: 0});
            set({status: ''});
            set({page: 1});
        },
    };
});
