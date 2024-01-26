import {LocalizationProvider, TimePicker} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField} from '@mui/material';
import React, {FC, FocusEventHandler} from 'react';

import s from './index.module.scss';

interface IClockPicker {
    label?: string;
    value: string;
    disabled?: boolean;
    onClose?: () => void;
    onChange: (
        value: string | null,
        keyboardInputValue?: string | undefined,
    ) => void;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const ClockPicker: FC<IClockPicker> = ({
    onChange,
    value,
    label,
    onBlur,
    disabled,
    onClose,
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={label}
                value={value}
                onChange={onChange}
                mask={'__:__'}
                inputFormat={'HH:mm'}
                className={s.timePicker}
                onClose={onClose}
                views={['hours', 'minutes']}
                ampm={false}
                renderInput={(parameters) => {
                    return (
                        <TextField
                            size="small"
                            {...parameters}
                            error={false}
                            sx={{'& fieldset': {border: 'none'}}}
                            onBlur={onBlur}
                            disabled={disabled}
                            style={{
                                background: '#fff',
                                height: 40,
                            }}
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};
