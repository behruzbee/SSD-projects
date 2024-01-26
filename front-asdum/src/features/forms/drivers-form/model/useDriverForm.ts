import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useMemo} from 'react';
import {Path, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {UseMutationResult} from 'react-query';
import shallow from 'zustand/shallow';

import {driverValidation} from '@features/forms/drivers-form/lib/validation_scheme';
import {DriverFormData} from '@features/forms/drivers-form/model/models';
import {isEmptyObject} from '@shared/helpers';
import {useEmployeePositionsStore} from '@store/employee_positions';
import {useEmployeeManageStore} from '@store/employees_manage';
import {useParkStore} from '@store/park';

import {driverFormData} from '../lib/formDataFilter';
import {useGetDriverData} from './useGetDriverData';

type SelectOptions = {label: string; value: number};

export const useDriverForm = (
    saveDriver: UseMutationResult<AxiosResponse, unknown, any>,
) => {
    const {t} = useTranslation();
    const parks = useParkStore((s) => s.parks);
    const employeePositions = useEmployeePositionsStore(
        (s) => s.employeePositions,
    );
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        register,
    } = useForm<DriverFormData, Path<DriverFormData>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        defaultValues: {},
        resolver: yupResolver(driverValidation()),
    });
    const [clearSelected, selectedEmployee] = useEmployeeManageStore(
        (s) => [s.clearSelected, s.selectedEmployee],
        shallow,
    );

    const save = handleSubmit((data) => {
        const addDriverData = useGetDriverData(data);
        const formData = driverFormData(addDriverData);
        saveDriver.mutate(formData);
    });

    const driverFormTitle = useMemo(() => {
        const isEdit = isEmptyObject(selectedEmployee);
        const title = isEdit ? t('edit_driver') : t('add_driver');
        const saveLabel = isEdit ? t('update') : t('add');
        return {title, saveLabel};
    }, [t, selectedEmployee]);
    useEffect(() => {
        if (isEmptyObject(selectedEmployee)) {
            const {
                fullname,
                tab_number,
                pinfl,
                position_id,
                park_id,
                id,
                driver_file,
                med_file,
                driver_license_expire_date,
                med_certificate_expire_date,
            } = selectedEmployee;
            const driverPosition = employeePositions.find(
                (item) => item.id === position_id,
            );
            const park = parks.find((item) => item.park_id === park_id);
            setValue('fullname', fullname as string);
            setValue(
                'driver_license_expire_date',
                new Date(driver_license_expire_date as string),
            );
            setValue('driver_file', driver_file as string);
            setValue('med_file', med_file as string);
            setValue(
                'med_certificate_expire_date',
                new Date(med_certificate_expire_date as string),
            );
            setValue('tab_number', tab_number as number);
            setValue('pinfl', pinfl as number);
            setValue('id', id);
            setValue('position_id', {
                label: driverPosition?.name,
                value: driverPosition?.id,
            } as SelectOptions);
            setValue('park_id', {
                label: park?.park,
                value: park?.park_id,
            } as SelectOptions);
        }

        return clearSelected;
    }, []);

    return {save, control, errors, driverFormTitle, register};
};
