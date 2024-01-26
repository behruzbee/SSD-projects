import {string} from 'yup';

import {requireText} from '@shared/constants';

export const stringValidator = string().trim().nullable().required(requireText);
