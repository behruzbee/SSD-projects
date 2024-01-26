import React from 'react';
import {components} from 'react-select';

import {textCropper} from '@shared/helpers';
const ValueContainer = ({children, ...props}: any) => {
    const [values, input] = children;
    return (
        <components.ValueContainer {...props}>
            <span>
                {textCropper(values?.props?.children, 16)}
                {input}
            </span>
        </components.ValueContainer>
    );
};

export default React.memo(ValueContainer);
