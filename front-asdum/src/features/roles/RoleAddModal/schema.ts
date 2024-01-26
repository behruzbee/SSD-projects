import * as yup from 'yup';

import {requireText} from '@src/shared/constants';

export interface RolesProps {
    name: string;
    remark: string;
}

export const rolesScheme = yup.object().shape({
    name: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
    // active: yup.boolean().required(requireText),
});
