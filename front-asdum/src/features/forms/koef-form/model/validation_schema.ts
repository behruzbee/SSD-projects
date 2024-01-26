import {object} from 'yup';

import {numberValidator, stringValidator} from '@shared/lib';

export const koefficientSchema = () =>
    object().shape({
        coefficient: stringValidator,
        amount: numberValidator,
    });
