import {CircularProgress} from '@mui/material';
import {useSelectedModel} from '@widgets/TablePageWrapper';
import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import ComponentWithLabel from '@components/ComponentWithLabel';
import {DayPickerController} from '@components/DayPicker/ui';
import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import {SelectWithLabel} from '@components/SelectWithLabel';
import {StyledInputController} from '@components/StyledInputController';
import {IAutoTransModel} from '@models/autotrans_model';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {commentInput} from '@styles/components/helperStyles';

import s from './index.module.scss';
import {useInputsArrays} from './lib/useInputsArrays';
import {AutoTransFormFieldProps, SelectNames} from './model/transport.model';
import {useAutoTransFormLogic} from './model/useAutoTransFormLogic';

export const AutoTransFormField: FC<AutoTransFormFieldProps> = ({
    title,
    isOpen,
    onClose,
    selected,
    saveMutation,
}) => {
    const {t} = useTranslation();
    const {isSuperAdmin} = useHandleIsAdmin();

    const {
        control,
        errors,
        parkOptions,
        busModelOptions,
        regionOptions,
        onSubmit,
        isLoading,
        register,
    } = useAutoTransFormLogic(saveMutation, selected?.id);
    const {clearSelected} = useSelectedModel<IAutoTransModel>();
    const {selectsArray, inputsArray} = useInputsArrays(
        parkOptions,
        busModelOptions,
        regionOptions,
        isSuperAdmin,
    );

    useEffect(() => () => clearSelected(), []);

    return (
        <DialogWrapper
            open={isOpen}
            onClose={onClose}
            title={title}
            save={onSubmit}
            isLoading={saveMutation.isLoading}
            width={800}
            isForm
        >
            {!isLoading ? (
                <div className={s.wrapper}>
                    <div className={s.container}>
                        {selectsArray.map((elem) => (
                            <SelectWithLabel
                                {...elem}
                                key={elem.name}
                                placeholder={elem.label}
                                control={control}
                                errors={errors[elem.name as SelectNames]}
                            />
                        ))}

                        {inputsArray.map(({name, label}) => (
                            <ComponentWithLabel label={label} key={name}>
                                <StyledInputController
                                    name={name}
                                    placeholder={label}
                                    control={control}
                                    errorMessage={errors[name]?.message}
                                />
                            </ComponentWithLabel>
                        ))}

                        <ComponentWithLabel label={t('insurance_expire_date')}>
                            <DayPickerController
                                name="insurance_expire_date"
                                control={control}
                                register={register}
                                isLeft={true}
                                errorText={
                                    errors.insurance_expire_date?.message
                                }
                            />
                        </ComponentWithLabel>

                        <ComponentWithLabel label={t('license_number')}>
                            <StyledInputController
                                name="license_number"
                                placeholder={t('license_number')}
                                control={control}
                                errorMessage={errors.license_number?.message}
                            />
                        </ComponentWithLabel>

                        <ComponentWithLabel label={t('license_expire_date')}>
                            <DayPickerController
                                name="license_expire_date"
                                isLeft
                                control={control}
                                register={register}
                                errorText={errors.license_expire_date?.message}
                            />
                        </ComponentWithLabel>

                        <ComponentWithLabel label={t('tex_number')}>
                            <StyledInputController
                                name="tex_number"
                                placeholder={t('tex_number')}
                                control={control}
                                errorMessage={errors.tex_number?.message}
                            />
                        </ComponentWithLabel>

                        <ComponentWithLabel label={t('tex_expire_date')}>
                            <DayPickerController
                                name="tex_expire_date"
                                control={control}
                                register={register}
                                errorText={errors.tex_expire_date?.message}
                                isLeft={false}
                            />
                        </ComponentWithLabel>

                        <ComponentWithLabel label={t('made_date')}>
                            <DayPickerController
                                name="made_date"
                                control={control}
                                register={register}
                                errorText={errors.made_date?.message}
                                isLeft
                            />
                        </ComponentWithLabel>
                    </div>

                    <ComponentWithLabel label={t('remark')}>
                        <InputController
                            name="remark"
                            control={control}
                            placeholder={t('remark')}
                            errors={errors.remark?.type}
                            message={errors.remark?.message}
                            multiline
                            sx={commentInput}
                        />
                    </ComponentWithLabel>
                </div>
            ) : (
                <div className="loading">
                    <CircularProgress size={40} />
                </div>
            )}
        </DialogWrapper>
    );
};
