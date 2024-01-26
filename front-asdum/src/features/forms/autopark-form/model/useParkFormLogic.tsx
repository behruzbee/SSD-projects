import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useMemo, useState} from 'react';
import {Path, useForm, useWatch} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {useRegionGaragesQuery} from '@api/garages/hooks';
import {useSingleParkQuery} from '@api/park/useSingleParkQuery';
import useRegion from '@api/region/hooks';
import {IParkModel, ISavePark} from '@models/park_model';
import {dateToString} from '@shared/helpers/format-date';
import {handleOption} from '@shared/helpers/helpers';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {useAuthStore} from '@shared/store/auth';

import {AutoParkFormData, schema} from '../lib/schema';

export const useParkFormLogic = (
    selected: IParkModel,
    saveMutation: UseMutationResult<AxiosResponse, unknown, ISavePark>,
) => {
    const [parkFormValues, setParkFormValues] =
        useState<AutoParkFormData | null>(null);

    const {isSuperAdmin} = useHandleIsAdmin();
    const userInfo = useAuthStore((s) => s.userInfo);

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<AutoParkFormData, Path<AutoParkFormData>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(schema(isSuperAdmin)),
        defaultValues: {license_expire_date: null},
    });
    const regionValue = useWatch({control, name: 'region_id'});
    const singleParkQuery = useSingleParkQuery(selected?.park_id ?? NaN);
    const regionsQuery = useRegion();
    const selectedGarageQuery = useRegionGaragesQuery(
        singleParkQuery.data?.region_id ?? NaN,
    );

    const regionGaragesQuery = useRegionGaragesQuery(
        regionValue?.value || userInfo.region?.id || NaN,
    );

    const garageOptions = useMemo(
        () => handleOption(regionGaragesQuery.data ?? []),
        [regionGaragesQuery.data],
    );
    const selectedGarageOptions = useMemo(
        () => handleOption(selectedGarageQuery.data ?? []),
        [selectedGarageQuery.data],
    );
    const regionOptions = useMemo(
        () => handleOption(regionsQuery.data ?? []),
        [regionsQuery.data],
    );

    useEffect(() => {
        const {data} = singleParkQuery;

        if (
            data &&
            selectedGarageOptions.length &&
            !parkFormValues?.garages?.length
        ) {
            setParkFormValues({
                ...data,
                region_id: regionOptions?.find(
                    (el) => el.value === data?.region_id,
                ),
                garages: selectedGarageOptions?.filter((el) =>
                    data?.garages?.some((v) => v.id === el.value),
                ),
                license_expire_date: data.license_expire_date
                    ? dateToString(data.license_expire_date)
                    : null,
            });
        }
    }, [singleParkQuery.data, regionOptions, selectedGarageOptions]);

    useEffect(() => {
        regionValue?.value &&
            regionValue?.value !== singleParkQuery.data?.region_id &&
            setValue('garages', []);
    }, [regionValue, singleParkQuery.data]);

    useEffect(() => {
        parkFormValues &&
            Object.keys(parkFormValues).forEach(
                (key: keyof AutoParkFormData) => {
                    setValue(key, parkFormValues?.[key]);
                },
            );
    }, [parkFormValues, setValue]);

    const onSubmit = handleSubmit((data) => {
        const saveData: ISavePark = {
            garage_id: data.garages?.map((el) => el.value) as string[],
            region_id: data.region_id?.value || (userInfo.region?.id as number),
            id: selected?.park_id ?? null,
            license_expire_date: dateToString(
                data.license_expire_date as string,
            ),
            license_name: data.park_name,
            license_number: data.park_license_num,
            short_name: data.short_name,
            remark: data.park_remark,
        };

        saveMutation.mutate(saveData);
    });

    return {
        control,
        errors,
        garageOptions,
        regionOptions,
        regionValue: regionValue?.value,
        garageLoading: regionGaragesQuery.isLoading,
        onSubmit,
        isLoading:
            singleParkQuery.isLoading ||
            regionsQuery.isLoading ||
            selectedGarageQuery.isLoading,
    };
};
