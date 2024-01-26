import React, {FC} from 'react';
import WindowedSelect from 'react-windowed-select';

import {customStyle} from '@components/Select/constants';

import {windowedSelectStyles} from './select-styles';
import {CommonProps2} from './select.types';
import {NoOptionsMessage} from './ui/no-option-message';
import Option from './ui/option';
import ValueContainer from './ui/value-container';

export const ReactSelect: FC<CommonProps2> = ({
    options,
    value,
    onChange,
    width,
    placeholder,
}) => {
    return (
        <div style={{width}}>
            <WindowedSelect
                windowThreshold={10}
                isClearable
                placeholder={placeholder}
                closeMenuOnSelect={false}
                options={options}
                onChange={onChange}
                hideSelectedOptions={false}
                components={{Option, ValueContainer, NoOptionsMessage}}
                value={value}
                styles={customStyle(windowedSelectStyles)}
            />
        </div>
    );
};
