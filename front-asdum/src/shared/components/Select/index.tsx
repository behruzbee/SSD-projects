import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {components, createFilter} from 'react-select';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import ArrowDowIcon from '@src/images/svgs/ArrowDowIcon';

import {customStyle} from './constants';
import styles from './index.module.scss';
import {Container, Message} from './style';
import {Props} from './type';

const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'any' as const,
};

const MultiSelect = ({
    nooptionsmessage,
    icon,
    iconleft,
    ref,
    iconright,
    onChange,
    isLoading,
    closeMenuOnSelect,
    isCreatable,
    menuPlacement,
    ...props
}: Props) => {
    const {t} = useTranslation();
    const DropdownIndicator = (iconProps: any) => {
        return (
            <components.DropdownIndicator data-cy={props.dataCy} {...iconProps}>
                {props.IconDown ? (
                    props.IconDown
                ) : (
                    <ArrowDowIcon className={styles.arrowDown} />
                )}
            </components.DropdownIndicator>
        );
    };
    const NoOptionsMessage = (props: any) => {
        return (
            <components.NoOptionsMessage data-cy={props.dataCy} {...props}>
                <span className="custom-css-class">{nooptionsmessage}</span>
            </components.NoOptionsMessage>
        );
    };

    const ValueContainer = (props: any) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer data-cy={props.dataCy} {...props}>
                    {icon && (
                        <div
                            style={{
                                position: 'absolute',
                                left: iconleft,
                                right: iconright,
                            }}
                        >
                            <>{icon}</>
                        </div>
                    )}
                    {props.children}
                </components.ValueContainer>
            )
        );
    };
    const formatCreateLabel = (inputValue: string) =>
        `${t('add')} ${inputValue}`;
    const currentValue = useMemo(
        () => ({label: props.defaultValue?.label}),
        [props.defaultValue],
    );

    return (
        <Container
            fontSize={props.fontSize}
            width={props.width}
            margin={props.margin}
        >
            {isCreatable ? (
                <CreatableSelect
                    components={{
                        DropdownIndicator,
                        NoOptionsMessage,
                        ValueContainer,
                    }}
                    onChange={onChange}
                    menuPlacement={menuPlacement}
                    inputId={props.label}
                    selectStyle={props.selectStyle}
                    isLoading={isLoading}
                    isOptionDisabled={props.isOptionDisabled}
                    value={props.defaultValue?.value ? currentValue : null}
                    ref={ref}
                    filterOption={createFilter(filterConfig)}
                    isDisabled={props.isDisabled}
                    formatCreateLabel={formatCreateLabel}
                    data-cy={props.dataCy}
                    isSearchable={props.isSearchable}
                    {...props}
                    {...props.field}
                    menuPortalTarget={props.menuPortalTarget}
                    closeMenuOnSelect={closeMenuOnSelect}
                    styles={customStyle(props)}
                />
            ) : (
                <Select
                    components={{
                        DropdownIndicator,
                        NoOptionsMessage,
                        ValueContainer,
                    }}
                    onChange={onChange}
                    menuPlacement={menuPlacement}
                    inputId={props.label}
                    selectStyle={props.selectStyle}
                    isLoading={isLoading}
                    isOptionDisabled={props.isOptionDisabled}
                    value={props.defaultValue?.value ? currentValue : null}
                    ref={ref}
                    filterOption={createFilter(filterConfig)}
                    isDisabled={props.isDisabled}
                    data-cy={props.dataCy}
                    isSearchable={props.isSearchable}
                    {...props}
                    {...props.field}
                    menuPortalTarget={props.menuPortalTarget}
                    closeMenuOnSelect={closeMenuOnSelect}
                    styles={customStyle(props)}
                />
            )}
            {props.error ? (
                <Message
                    isStatic={props.isStatic}
                    labelStyle={props.labelStyle}
                >
                    {props.message}
                </Message>
            ) : null}
        </Container>
    );
};

export default MultiSelect;
