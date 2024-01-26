import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import {OptionProps, components} from 'react-select';
const Option = (props: OptionProps) => {
    return (
        <div>
            <components.Option {...props}>
                <Checkbox checked={props.isSelected} size="small" />{' '}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export default React.memo(Option);
