import {Checkbox} from '@mui/material';
import React, {FC} from 'react';

import {checkboxStyles} from '@styles/components/checkbox';

import {useSelectedModel} from './model/selected-checkbox.store';
import {ISelectedCheckbox} from './model/selected-checkbox.types';

export const SelectedCheckbox: FC<ISelectedCheckbox> = ({
    id,
    onClick,
    disabled,
}) => {
    const {selected} = useSelectedModel();
    const isChecked = selected.id === id;
    const handleClick = () => {
        if (onClick) {
            onClick(isChecked);
        }
    };
    return (
        <Checkbox
            checked={isChecked}
            disabled={disabled}
            onClick={handleClick}
            sx={checkboxStyles}
        />
    );
};
