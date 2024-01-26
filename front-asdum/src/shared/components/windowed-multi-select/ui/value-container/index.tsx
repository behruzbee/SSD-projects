import React from 'react';
import {useTranslation} from 'react-i18next';
import {components} from 'react-select';
const ValueContainer = ({children, ...props}: any) => {
    const {t} = useTranslation();
    const [values, input] = children;
    let value;
    if (Array.isArray(values)) {
        value = `${t('chosen')} ${values.length}`;
    }

    return (
        <components.ValueContainer {...props}>
            <span>
                {value ? value : values?.props?.children}
                {input}
            </span>
        </components.ValueContainer>
    );
};

export default React.memo(ValueContainer);
