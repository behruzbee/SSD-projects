import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Box, CircularProgress, Stack, TextField} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import MultiSelectWithCheckbox from '@components/MultiSelectWithCheckbox';
import SelectController from '@components/SelectController';
import {useDefineSaveLabel} from '@shared/helpers';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';

import {AutoParkFormFieldProps} from './model/model';
import {useParkFormLogic} from './model/useParkFormLogic';

const AutoParkFormField: React.FC<AutoParkFormFieldProps> = ({
    title,
    isOpen,
    onClose,
    selected,
    saveMutation,
}) => {
    const {isSuperAdmin} = useHandleIsAdmin();
    const {t} = useTranslation();

    const {
        control,
        errors,
        garageOptions,
        regionOptions,
        garageLoading,
        isLoading,
        onSubmit,
    } = useParkFormLogic(selected, saveMutation);

    return (
        <DialogWrapper
            title={title}
            open={isOpen}
            onClose={onClose}
            save={onSubmit}
            width={550}
            saveLabel={useDefineSaveLabel(
                selected?.col1,
                t('add'),
                t('update'),
            )}
            isLoading={saveMutation.isLoading}
            isForm
        >
            {isLoading ? (
                <div className="loading">
                    <CircularProgress size={40} />
                </div>
            ) : (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={2.5}>
                        <InputController
                            name="park_name"
                            control={control}
                            size={'small'}
                            label={t('park_name')}
                            message={errors.park_name?.message}
                        />

                        <InputController
                            name="short_name"
                            control={control}
                            size={'small'}
                            label={t('short_brand_name')}
                            message={errors.park_name?.message}
                        />

                        <InputController
                            name="park_license_num"
                            control={control}
                            size={'small'}
                            label={t('license_num')}
                            message={errors.park_license_num?.message}
                        />

                        <Controller
                            name="license_expire_date"
                            control={control}
                            render={({field}) => (
                                <DesktopDatePicker
                                    {...field}
                                    label={t('license_expire_date')}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size={'small'}
                                            error={
                                                !!errors.license_expire_date
                                                    ?.message
                                            }
                                            helperText={
                                                errors.license_expire_date
                                                    ?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        />

                        {isSuperAdmin && (
                            <Box>
                                <SelectController
                                    control={control}
                                    name="region_id"
                                    placeholder={t('region')}
                                    options={regionOptions}
                                    errors={errors.region_id?.label?.type}
                                    message={errors.region_id?.label?.message}
                                />
                            </Box>
                        )}

                        <Controller
                            name="garages"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <MultiSelectWithCheckbox
                                    onChange={onChange}
                                    selected={value ?? []}
                                    isLoading={garageLoading}
                                    options={garageOptions}
                                    label={t('garages')}
                                    // @ts-ignore
                                    errorText={errors?.garages?.message}
                                    noOptionsText={t('no_options')}
                                />
                            )}
                        />

                        <InputController
                            name="park_remark"
                            size="small"
                            control={control}
                            label={t('remark')}
                            multiline
                        />
                    </Stack>
                </LocalizationProvider>
            )}
        </DialogWrapper>
    );
};

export default React.memo(AutoParkFormField);
