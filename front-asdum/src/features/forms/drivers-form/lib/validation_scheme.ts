import {object} from 'yup';

import {numberValidator} from '@shared/lib/validators/numberValidator';
import {selectValidator} from '@shared/lib/validators/selectValidator';
import {stringValidator} from '@shared/lib/validators/stringValidator';

export const driverValidation = () =>
    object().shape({
        fullname: stringValidator,
        park_id: selectValidator,
        position_id: selectValidator,
        tab_number: numberValidator,
        pinfl: numberValidator,
    });
