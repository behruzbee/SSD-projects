import * as yup from 'yup';

import {OrderSaveModel} from '@src/shared/models/order_model';

export interface FormProps extends OrderSaveModel {
    id: number;
    model: string;
    gos: string;
    even: string;
    graphic?: any;
    tab_num: any;
    garage_number?: any;
}

export const orderScheme = yup.object().shape({
    // license_name: yup.string().trim().required(requireText),
    // short_name: yup.string().trim().required(requireText),
    // license_number: yup.string().trim().required(requireText),
    // remark: yup.string().trim().required(requireText),
    // region_id: yup.object().shape({
    //     value: yup.string().required(requireText),
    //     label: yup.string().required(requireText),
    // }),
    // garages: yup.array().of(yup.string().required(requireText)),
    // active: yup.boolean().required(requireText),
});
