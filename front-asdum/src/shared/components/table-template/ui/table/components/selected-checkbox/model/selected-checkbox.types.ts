import {CheckboxProps} from '@models/props';

export interface ISelectedCheckbox extends CheckboxProps {
    onClick?: (checked: boolean) => void;
    disabled?: boolean;
}
export interface SelectedModel<T extends CheckboxProps> {
    selected: T;
    setSelected: (selected: T) => void;
    toggleCheckbox: (row: T) => void;
    clearSelected: () => void;
}
