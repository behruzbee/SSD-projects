import {mixed, object} from 'yup';

import {Override} from '@models/_helperTypes';
import {ISingleAutoTrans} from '@models/autotrans_model';
import {SelectOptions} from '@models/select_options_model';
import {selectValidator} from '@shared/lib/validators/selectValidator';
import {stringValidator} from '@shared/lib/validators/stringValidator';

export type AutoTransFormData = Override<
    ISingleAutoTrans,
    {
        bus_model_id: SelectOptions<number> | undefined;
        park_id: SelectOptions<number> | undefined;
        region: SelectOptions<number> | undefined;
    }
>;

export type NoSelectAutoTransFormData = Omit<
    AutoTransFormData,
    'bus_model_id' | 'park_id' | 'region'
>;

export const schema = (isSuperAdmin: boolean) =>
    object().shape({
        bus_model_id: selectValidator,
        park_id: selectValidator,
        region: isSuperAdmin ? selectValidator : mixed().notRequired(),
        gos: stringValidator,
        park_no: stringValidator,
        tracker_id: stringValidator,
        sim_number: stringValidator,
    });
