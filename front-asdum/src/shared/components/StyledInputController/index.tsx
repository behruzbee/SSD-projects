import {TextFieldProps} from '@mui/material';
import React from 'react';
import {Control, Path} from 'react-hook-form';

import {inputStyles} from '@styles/components/helperStyles';

import {InputController} from '../InputController';

interface StyledInputControllerProps<T> {
    control: Control<T, Path<T>>;
    name: Path<T>;
    errorMessage?: string;
    width?: string;
}

export const StyledInputController = <T,>({
    control,
    name,
    errorMessage,
    width,
    ...props
}: TextFieldProps & StyledInputControllerProps<T>) => {
    return (
        <div style={{width: width ?? '100%'}}>
            <InputController
                {...props}
                control={control}
                name={name}
                errors={errorMessage ? true : false}
                message={errorMessage}
                sx={inputStyles}
            />
        </div>
    );
};
