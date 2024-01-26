import {TextField, TextFieldProps} from '@mui/material';
import cx from 'classnames';
import React, {ReactNode} from 'react';
import MaskInput, {IInputProps} from 'react-maskinput';

import styles from './index.module.scss';

interface IProps {
    error?: any;
    field?: any;
    register?: any;
    endAdornment?: ReactNode;
    message?: string;
}

const CustomMask = (props: IInputProps) => {
    return (
        <MaskInput
            alwaysShowMask
            maskString="00 000 AAA"
            mask="00 000 aaa"
            {...props}
        />
    );
};

const InputMaskM = React.forwardRef<
    HTMLInputElement | HTMLDivElement,
    TextFieldProps & IProps
>(({className, error, endAdornment, message, multiline, ...props}, ref) => {
    return (
        <TextField
            error={error}
            className={cx(className, styles.input)}
            helperText={message}
            InputLabelProps={{shrink: props.field.value ? true : false}}
            InputProps={{
                inputComponent: CustomMask,
                endAdornment,
                ref,
                autoComplete: 'new-password',
                multiline,
                rows: multiline ? 3 : 1,
            }}
            {...props.field}
            {...props.register}
            {...props}
        />
    );
});

export default React.memo(InputMaskM);
