import {TextField, TextFieldProps} from '@mui/material';
import cx from 'classnames';
import React, {ReactNode} from 'react';
import {ControllerRenderProps} from 'react-hook-form';

import styles from './index.module.scss';

interface IProps {
    field: ControllerRenderProps<any, any>;
    errors?: string | boolean;
    register?: any;
    endAdornment?: ReactNode;
    message?: string;
    step?: string;
}

const InputM = React.forwardRef<
    HTMLInputElement | HTMLDivElement,
    TextFieldProps & IProps
>(
    (
        {
            className,
            errors,
            endAdornment,
            message,
            multiline,
            disabled,
            field,
            ...props
        },
        ref,
    ) => {
        return (
            <TextField
                error={errors ? true : false}
                className={cx(className, styles.input, [
                    disabled && styles.disabled,
                ])}
                helperText={message}
                InputLabelProps={{shrink: field?.value ? true : false}}
                InputProps={{
                    endAdornment: endAdornment,
                    ref: ref,
                    autoComplete: 'new-password',
                    multiline: multiline,
                    rows: multiline ? 3 : 1,
                    inputProps: {
                        min: 0,
                        step: props?.type !== 'time' ? 0.000001 : undefined,
                    },
                }}
                disabled={disabled}
                type={props.type}
                {...field}
                {...props.register}
                {...props}
                value={field?.value || ''}
            />
        );
    },
);

export default React.memo(InputM);
