import React from 'react';
import {DateRange, SelectRangeEventHandler} from 'react-day-picker';
import {Control, Controller, Path} from 'react-hook-form';

import {BaseDatePicker} from './ui/base-date-picker';

interface IDatePickerProps<T> {
    placeholder?: string;
    control: Control<T, Path<T>>;
    name: Path<T>;
    handleRangeSelect: SelectRangeEventHandler;
    selectedRange: DateRange | undefined;
    message: string | undefined;
}

export const DatePickerController = <T,>({
    control,
    placeholder,
    name,
    message,
    selectedRange,
    handleRangeSelect,
}: IDatePickerProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <BaseDatePicker
                    message={message}
                    placeholder={placeholder}
                    handleRangeSelect={handleRangeSelect}
                    selectedRange={selectedRange}
                    {...field}
                />
            )}
        />
    );
};
