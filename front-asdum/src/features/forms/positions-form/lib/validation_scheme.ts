import {object} from 'yup';

import {stringValidator} from '@shared/lib/validators/stringValidator';

export const positionValidation = () =>
    object().shape({
        name: stringValidator,
    });
