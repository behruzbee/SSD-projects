import * as yup from 'yup';

import {moreError, requireText} from '@shared/constants';

export type FormProps = {
    race_count: string;
    garage_begin_time: string;
    garage_end_time: string;
    kpp_begin_time: string;
    kpp_begin: any;
    kpp_end_time: string;
    kpp_end: any;
    prostoy: number;
    interval: number;
    kpp_lunch1: any;
    lunch1_begin: string;
    lunch1_end: string;
    kpp_lunch2: any;
    lunch2_begin: string;
    lunch2_end: string;
    graph_number?: number;
    selectedWeekDay?: number;
};

export interface LocationState {
    state: {
        routeId: number;
    };
}

export const formScheme = yup.object().shape({
    race_count: yup.string().trim().required(requireText),
    garage_begin_time: yup.string().required(requireText),
    garage_end_time: yup
        .string()
        .when('garage_begin_time', (garage_begin_time, schema) => {
            return schema.test({
                test: (garage_end_time: any) =>
                    !!garage_begin_time && garage_end_time > garage_begin_time,
                message: moreError,
            });
        })
        .required(requireText),
    kpp_begin_time: yup.string().required(requireText),
    kpp_end_time: yup
        .string()
        .when('kpp_begin_time', (kpp_begin_time, schema) => {
            return schema.test({
                test: (kpp_end_time: any) =>
                    !!kpp_begin_time && kpp_end_time > kpp_begin_time,
                message: moreError,
            });
        })
        .required(requireText),
    prostoy: yup.number().required(requireText),
    interval: yup.number().required(requireText),
    lunch1_begin: yup.string().trim().required(requireText),
    lunch1_end: yup
        .string()
        .when('lunch1_begin', (lunch1_begin, schema) => {
            return schema.test({
                test: (lunch1_end: any) =>
                    !!lunch1_begin && lunch1_end > lunch1_begin,
                message: moreError,
            });
        })
        .required(requireText),
    lunch2_begin: yup.string().required(requireText),
    lunch2_end: yup
        .string()
        .when('lunch2_begin', (lunch2_begin, schema) => {
            return schema.test({
                test: (lunch2_end: any) =>
                    !!lunch2_begin && lunch2_end > lunch2_begin,
                message: moreError,
            });
        })
        .required(requireText),
    // region_id: yup.object().shape({
    //     value: yup.string().required(requireText),
    //     label: yup.string().required(requireText),
    // }),
});
