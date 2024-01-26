import React, {FC, useRef} from 'react';
import {ActionMeta} from 'react-select';
import WindowedSelect from 'react-windowed-select';

import {customStyle} from '@components/Select/constants';

import {windowedSelectStyles} from './select-styles';
import {CommonProps, GroupType, OptionsType, ValueType} from './select.types';
import {createGroup} from './ui/create-group';
import {NoOptionsMessage} from './ui/no-option-message';
import Option from './ui/option';
import ValueContainer from './ui/value-container';

const ReactMultiSelect: FC<CommonProps> = ({
    options,
    isMulti,
    value,
    onChange,
    isAllSelect,
    width,
    placeholder,
}) => {
    let selectOptions: ValueType = [];
    const isGroup = !!options[0]?.options;
    if (isGroup) {
        const groupedOptions: Array<GroupType> = options;
        if (isAllSelect && options.length) {
            groupedOptions.unshift({label: 'Select all', options: []});
        }
        //@ts-ignore
        selectOptions = groupedOptions.map((option) =>
            createGroup(option.label, option.options, onChange),
        );
    } else {
        selectOptions = options;
    }
    const valueRef = useRef(value);
    valueRef.current = value;
    const selectAllOption = {
        value: '*',
        label: 'Select all',
    };
    const isSelectAllSelected = () =>
        valueRef.current.length === selectOptions.length;
    const isOptionSelected = (option: any) =>
        valueRef.current.some(({value}) => value === option.value) ||
        isSelectAllSelected();
    const getOptions = () =>
        isAllSelect && options.length
            ? [selectAllOption, ...selectOptions]
            : selectOptions;

    const handleChange = (
        newOption: OptionsType,
        actionMeta: ActionMeta<any>,
    ) => {
        const {action, option, removedValue} = actionMeta;
        if (
            action === 'select-option' &&
            option?.value === selectAllOption?.value
        ) {
            onChange(selectOptions);
        } else if (
            (action === 'deselect-option' &&
                option?.value === selectAllOption?.value) ||
            (action === 'remove-value' &&
                removedValue?.value === selectAllOption?.value)
        ) {
            onChange([]);
        } else if (
            actionMeta?.action === 'deselect-option' &&
            isSelectAllSelected()
        ) {
            //@ts-ignore
            onChange(selectOptions.filter(({value}) => value !== option.value));
        } else {
            //@ts-ignore
            onChange(newOption || []);
        }
    };

    return (
        <div style={{width}}>
            <WindowedSelect
                windowThreshold={10}
                isOptionSelected={isOptionSelected}
                isMulti={isMulti}
                isClearable
                placeholder={placeholder}
                closeMenuOnSelect={false}
                options={getOptions()}
                onChange={handleChange}
                hideSelectedOptions={false}
                components={{Option, ValueContainer, NoOptionsMessage}}
                value={value}
                styles={customStyle(windowedSelectStyles)}
            />
        </div>
    );
};

export default React.memo(ReactMultiSelect);
