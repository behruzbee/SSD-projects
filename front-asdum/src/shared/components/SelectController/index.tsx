import React from 'react';
import {Controller} from 'react-hook-form';

import {SelectOptions} from '@models/select_options_model';

import MultiSelect from '../Select';
import {Props} from '../Select/type';

interface IProps extends Props {
    errors: any;
    styles: any;
    control: any;
    type: any;
    name: any;
    onChange?: (payload: any) => void;
    required: boolean;
    placeholder: string;
    label: string;
    emptyMsg: string;
    menuPlacement?: 'top' | 'bottom' | 'auto';
    message: string;
    isLoading: boolean;
    options: SelectOptions[];
    isMulti: boolean;
    isDisabled: boolean;
    defaultValue: any;
    ref?: HTMLElement | null;
    isCreatable?: boolean;
    onCreateOption?: (opt: string) => void;
}

const SelectController = ({
    control,
    errors,
    name,
    required,
    placeholder,
    label,
    emptyMsg,
    message,
    isLoading,
    options,
    ref,
    isMulti,
    isDisabled,
    defaultValue,
    ...props
}: Partial<IProps>) => {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            rules={{
                required: required,
            }}
            render={({field}) => {
                return (
                    <MultiSelect
                        isLoading={isLoading}
                        options={options}
                        isMulti={isMulti}
                        defaultValue={defaultValue}
                        label={label}
                        ref={ref}
                        isDisabled={isDisabled}
                        margin={{
                            laptop: '0',
                        }}
                        placeholder={placeholder}
                        message={message}
                        error={errors}
                        field={field}
                        isClearable={false}
                        nooptionsmessage={emptyMsg}
                        isStatic
                        {...props}
                    />
                );
            }}
        />
    );
};

export default React.memo(SelectController);
