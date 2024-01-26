import {mixed, object} from 'yup';

import {SelectOptions} from '@models/select_options_model';
import {selectValidator} from '@shared/lib/validators/selectValidator';
import {stringValidator} from '@shared/lib/validators/stringValidator';

export interface GarageFormData {
    garage_name: string;
    region_id: SelectOptions<number> | undefined;
}

export const schema = (isSuperAdmin: boolean) =>
    object().shape({
        garage_name: stringValidator,
        region_id: isSuperAdmin ? selectValidator : mixed().notRequired(),
    });
