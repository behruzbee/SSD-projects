import {number} from 'yup';

import {requireText} from '@shared/constants';

export const numberValidator = number().nullable().required(requireText);
