import * as yup from 'yup';

import {requireText} from '@src/shared/constants';
import {OrderSaveModel} from '@src/shared/models/order_model';

export interface FormProps extends OrderSaveModel {
    id: number;
    model: string;
    gos: string;
    even: string;
    odd?: string;
    graphic: any;
    tab_num: any;
    tab_num2: any;
}

export const orderScheme = yup.object().shape({
    graphic: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
    graph_number: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
    tab_num: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
});

export const monthlyOrderScheme = yup.object().shape({
    graphic: yup.object().nullable().required(requireText),
    graph_number: yup.object().nullable().required(requireText),
    tab_num: yup.object().nullable().required(requireText),
    tab_num2: yup.object().nullable().required(requireText),
});
