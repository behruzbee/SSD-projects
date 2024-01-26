import {TextFieldProps} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, {ReactNode} from 'react';
import {Controller, PathValue, UnpackNestedValue} from 'react-hook-form';
import {Control, Path} from 'react-hook-form';

import InputM from '@components/Input';
import InputMaskM from '@components/MaskedInput';

interface IProps<T> {
    name: Path<T>;
    control: Control<T, Path<T>>;
    errors?: boolean | string;
    styles?: any;
    endAdornment?: ReactNode;
    required?: boolean;
    message?: string;
    textarea?: boolean;
    areaWidth?: any;
    masked?: boolean;
    mask?: string;
    disabled?: boolean;
    maskString?: string;
    classNameMask?: any;
    handleGettingData?: (e: any) => void;
    controlDefValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
}

export const InputController = <T,>({
    control,
    styles,
    endAdornment,
    errors,
    required,
    name,
    controlDefValue,
    message,
    textarea,
    disabled,
    areaWidth = 200,
    masked,
    sx,

    ...props
}: TextFieldProps & IProps<T>) => {
    if (masked) {
        return (
            <Controller
                control={control}
                defaultValue={controlDefValue}
                name={name}
                rules={{required}}
                render={({field}) => (
                    <InputMaskM
                        field={field}
                        error={errors}
                        className={styles}
                        endAdornment={endAdornment}
                        message={message}
                        {...props}
                    />
                )}
            />
        );
    }
    if (textarea) {
        return (
            <Controller
                control={control}
                name={name}
                rules={{required}}
                render={({field}) => (
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        name={field.name}
                        value={field.value as string}
                        onChange={field.onChange}
                        placeholder={props.placeholder}
                        style={{
                            ...(sx as React.CSSProperties),
                            width: areaWidth,
                        }}
                    />
                )}
            />
        );
    }
    return (
        <Controller
            control={control}
            defaultValue={controlDefValue}
            name={name}
            rules={{required}}
            render={({field}) => (
                <InputM
                    field={field}
                    errors={errors ?? message}
                    className={styles}
                    endAdornment={endAdornment}
                    message={message}
                    disabled={disabled}
                    fullWidth
                    sx={sx}
                    {...props}
                />
            )}
        />
    );
};
