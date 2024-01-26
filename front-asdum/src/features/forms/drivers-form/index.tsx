import {useEmployeeOperations} from '@entities/employee/lib/useEmployeeOperations';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import ComponentWithLabel from '@components/ComponentWithLabel';
import {DayPickerController} from '@components/DayPicker/ui';
import DialogWrapper from '@components/DialogWrapper';
import {FileInput} from '@components/FileInput';
import {InputController} from '@components/InputController';
import {SelectWithLabel} from '@components/SelectWithLabel';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {useDriverForm} from '@features/forms/drivers-form/model/useDriverForm';
import {useGetOptions} from '@features/forms/drivers-form/model/useGetOptions';
import {FileTypes} from '@shared/constants';
import {useEmployeeManageStore} from '@shared/store/employees_manage';
import {useEmployeePositionsStore} from '@store/employee_positions';
import {useParkStore} from '@store/park';

import s from './index.module.scss';

export const AddDriverForm = () => {
    const {t} = useTranslation();
    const {saveDriver} = useEmployeeOperations();
    const [addModalOpen, setModalOpen] = useModalManageStore((s) => [
        s.addModalOpen,
        s.setModalOpen,
    ]);
    const {save, control, errors, driverFormTitle, register} =
        useDriverForm(saveDriver);
    const handleClose = () => setModalOpen('add', false);
    const parks = useParkStore((s) => s.parks);
    const employeePositions = useEmployeePositionsStore(
        (s) => s.employeePositions,
    );
    const positionOptions = useMemo(
        () => useGetOptions(employeePositions, 'position'),
        [employeePositions],
    );
    const parksOptions = useMemo(() => useGetOptions(parks, 'park'), [parks]);
    const selectedEmployee = useEmployeeManageStore((s) => s.selectedEmployee);
    return (
        <DialogWrapper
            open={addModalOpen}
            onClose={handleClose}
            title={driverFormTitle.title}
            saveLabel={driverFormTitle.saveLabel}
            save={save}
            width={700}
            isLoading={saveDriver.isLoading}
            isForm
        >
            <div className={s.driverFormElementWrap}>
                <InputController
                    name="id"
                    className="hidden"
                    control={control}
                    size={'small'}
                    type={'hidden'}
                />
                <ComponentWithLabel label={t('fio')}>
                    <InputController
                        name="fullname"
                        control={control}
                        size={'small'}
                        message={errors.fullname?.message}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('tab_num')}>
                    <InputController
                        name="tab_number"
                        control={control}
                        type={'number'}
                        size={'small'}
                        message={errors.tab_number?.message}
                    />
                </ComponentWithLabel>

                <ComponentWithLabel label={t('pinfl')}>
                    <InputController
                        name="pinfl"
                        type={'number'}
                        control={control}
                        size={'small'}
                        message={errors.pinfl?.message}
                    />
                </ComponentWithLabel>

                <SelectWithLabel
                    control={control}
                    name={'position_id'}
                    label={t('position')}
                    placeholder={t('select')}
                    options={positionOptions}
                    errors={errors.position_id}
                />
                <SelectWithLabel
                    control={control}
                    name={'park_id'}
                    label={t('autopark')}
                    placeholder={t('select')}
                    options={parksOptions}
                    errors={errors.park_id}
                />
                <ComponentWithLabel label={t('driver_license')}>
                    <FileInput
                        name={'driver_file'}
                        control={control}
                        fileName={selectedEmployee?.driver_license}
                        fileTypes={[FileTypes.pdf]}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('')}>
                    <DayPickerController
                        name="driver_license_expire_date"
                        control={control}
                        errorText={''}
                        register={register}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('medical_certificate')}>
                    <FileInput
                        name={'med_file'}
                        fileName={selectedEmployee?.med_certificate}
                        control={control}
                        fileTypes={[FileTypes.pdf]}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('')}>
                    <DayPickerController
                        name="med_certificate_expire_date"
                        control={control}
                        errorText={''}
                        register={register}
                    />
                </ComponentWithLabel>
            </div>
        </DialogWrapper>
    );
};
