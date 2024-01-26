import {array, mixed, object} from 'yup';

import {Override} from '@models/_helperTypes';
import {ISinglePark} from '@models/park_model';
import {SelectOptions} from '@models/select_options_model';
import {requireText} from '@shared/constants';
import {selectValidator} from '@shared/lib/validators/selectValidator';
import {stringValidator} from '@shared/lib/validators/stringValidator';

export type AutoParkFormData = Override<
    ISinglePark,
    {
        garages: SelectOptions<string>[] | undefined;
        region_id: SelectOptions<number> | undefined;
    }
>;

export const schema = (isSuperAdmin: boolean) =>
    object().shape({
        garages: array()
            .of(selectValidator)
            .min(1, requireText)
            .required(requireText),
        region_id: isSuperAdmin ? selectValidator : mixed().notRequired(),
        license_expire_date: stringValidator,
        park_name: stringValidator,
        park_license_num: stringValidator,
        short_name: stringValidator,
    });
