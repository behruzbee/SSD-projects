import React from 'react';
import {useTranslation} from 'react-i18next';
import {components} from 'react-windowed-select';
export const NoOptionsMessage = (props: any) => {
    const {t} = useTranslation();
    return (
        <components.NoOptionsMessage data-cy={props.dataCy} {...props}>
            <span className="custom-css-class">{t('no_data')}</span>
        </components.NoOptionsMessage>
    );
};
