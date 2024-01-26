import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    TextField,
} from '@mui/material';
import React from 'react';

import ListWithBusIcon from '@components/ListWithBusIcon';
import {SelectOptions} from '@models/select_options_model';

interface Props<T> {
    options: SelectOptions<T>[];
    selected: SelectOptions<T>[];
    onChange: (value: SelectOptions<T>[]) => void;
    errorText: string | undefined;
    label: string;
    isLoading?: boolean;
    noOptionsText?: string;
}

const ValuesMenuStyles = {
    maxHeight: '70px',
    overflow: 'auto',
};

const MultiSelectWithCheckbox = <T,>({
    options,
    selected,
    onChange,
    label,
    errorText,
    isLoading,
    noOptionsText,
}: Props<T>) => {
    return (
        <Autocomplete
            multiple
            options={options}
            value={selected}
            onChange={(_, value) => onChange(value)}
            isOptionEqualToValue={(option, value) =>
                selected?.length > 0 && value.value === option.value
            }
            disableCloseOnSelect
            clearOnBlur
            noOptionsText={noOptionsText}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, state) => (
                <li {...props} key={option.value as unknown as number}>
                    <Checkbox
                        style={{marginRight: 8}}
                        checked={state.selected}
                    />
                    {option.label}
                </li>
            )}
            renderTags={(selectedTags) => (
                <Box sx={ValuesMenuStyles}>
                    <ListWithBusIcon
                        data={selectedTags}
                        value="label"
                        keyProp="value"
                    />
                </Box>
            )}
            loading={isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    size={'small'}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    error={errorText ? true : false}
                    helperText={errorText}
                />
            )}
        />
    );
};

export default MultiSelectWithCheckbox;
