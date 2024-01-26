import React from 'react';
import {Control, FieldError, Path} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import SelectController from '@components/SelectController';
import {SelectOptions} from '@models/select_options_model';
import {selectStyles} from '@styles/components/helperStyles';

import s from './index.module.scss';

interface SelectWithLabelProps<T> {
    control: Control<T>;
    name: Path<T>;
    options?: SelectOptions[] | undefined;
    label: string;
    isLoading?: boolean;
    errors?: {label?: FieldError};
    placeholder?: string;
    width?: string;
    labelIcon?: () => JSX.Element;
    onChange?: (e: any) => void;
}

export const SelectWithLabel = <T,>({
    label,
    control,
    options,
    name,
    placeholder,
    errors,
    width,
    labelIcon,
    isLoading,
    onChange,
}: SelectWithLabelProps<T>) => {
    const {t} = useTranslation();

    return (
        <div className={s.inputWrapper} style={{width}}>
            <div className={s.labelDiv}>
                {labelIcon && labelIcon()}
                <span className={s.inputLabel}>{label}</span>
            </div>

            <SelectController
                control={control}
                options={options}
                name={name}
                onChange={onChange}
                isLoading={isLoading}
                placeholder={placeholder}
                nooptionsmessage={t('no_options')}
                errors={errors?.label?.type}
                message={errors?.label?.message}
                {...selectStyles}
            />
        </div>
    );
};
