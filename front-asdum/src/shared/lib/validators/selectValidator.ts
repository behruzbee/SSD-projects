import {object} from 'yup';

import {stringValidator} from './stringValidator';

export const selectValidator = object().shape({
    label: stringValidator,
});
