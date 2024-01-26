import {Checkbox} from '@mui/material';
import React from 'react';

import {checkboxStyles} from '@styles/components/checkbox';

import {useSelectedCheckbox} from './model';

type Props<T> = {
    row: T;
    disabled?: boolean;
    id?: any;
    handleClick?: () => void;
};

export const SelectedCheckbox = <T extends {col1: number | string}>({
    row,
    disabled,
    id,
    handleClick,
}: Props<T>) => {
    const {isChecked, toggleCheckbox} = useSelectedCheckbox<T>();

    return (
        <Checkbox
            id={id}
            checked={isChecked(row)}
            onClick={() => {
                toggleCheckbox(row);
                handleClick && handleClick();
            }}
            disabled={disabled}
            sx={checkboxStyles}
        />
    );
};
