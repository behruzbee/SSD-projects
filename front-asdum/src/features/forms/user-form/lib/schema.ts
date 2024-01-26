import * as yup from 'yup';

import {Override} from '@models/_helperTypes';
import {SelectOptions} from '@models/select_options_model';
import {UserModel} from '@models/users_model';
import {confirmError, handleMinimal, requireText} from '@shared/constants';
import {selectValidator} from '@shared/lib/validators/selectValidator';
import {stringValidator} from '@shared/lib/validators/stringValidator';

export type UsersFormData = Override<
    UserModel,
    {
        region: SelectOptions<number> | undefined;
        role: SelectOptions<number> | undefined;
        fixed_parks: SelectOptions<number>[] | undefined;
        password?: string;
        confirmPassword?: string;
    }
>;

const passValidator = yup
    .string()
    .trim()
    .nullable()
    .min(8, handleMinimal(8))
    .matches(/\d/, 'Должен содержать хотя бы одну цифру');

const confirmPassValidator = yup
    .string()
    .trim()
    .nullable()
    .oneOf([yup.ref('password')], confirmError);

export const usersSchema = (isEditing: boolean, isSuperAdmin: boolean) =>
    yup.object().shape({
        fullname: stringValidator,
        login: stringValidator.min(5, handleMinimal(5)),
        fixed_parks: yup
            .array()
            .of(selectValidator)
            .min(1, requireText)
            .required(requireText),
        region: isSuperAdmin ? selectValidator : yup.mixed().notRequired(),
        role: selectValidator,
        password: !isEditing
            ? passValidator.required(requireText)
            : passValidator,
        confirmPassword: !isEditing
            ? confirmPassValidator.required(requireText)
            : confirmPassValidator,
    });
