import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useMemo} from 'react';
import {Path, useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {useSingleAutoTransQuery} from '@api/autotransport/hooks';
import {useAllBusModel} from '@api/bus_model/hooks';
import usePark from '@api/park/useParkQuery';
import useRegion from '@api/region/hooks';
import {IAutoTransSave} from '@models/autotrans_model';
import {dateToString} from '@shared/helpers/format-date';
import {handleOption} from '@shared/helpers/helpers';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {useAuthStore} from '@shared/store/auth';

import {AutoTransFormData, schema} from '../lib/schema';

export const useAutoTransFormLogic = (
    saveMutation: UseMutationResult<AxiosResponse, unknown, IAutoTransSave>,
    busId?: number,
) => {
    console.log('Save autotransport');
    const {isSuperAdmin} = useHandleIsAdmin();
    const userInfo = useAuthStore((s) => s.userInfo);

    const busQuery = useSingleAutoTransQuery(busId);
    const regionQuery = useRegion();
    const parksQuery = usePark();
    const busModelsQuery = useAllBusModel();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        register,
    } = useForm<AutoTransFormData, Path<AutoTransFormData>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(schema(isSuperAdmin)),
    });

    const regionOptions = useMemo(
        () => handleOption(regionQuery.data ?? []),
        [regionQuery.data],
    );

    const parkOptions = useMemo(
        () => handleOption(parksQuery.data?.list ?? [], 'park', 'park_id'),
        [parksQuery.data],
    );

    const busModelOptions = useMemo(
        () => handleOption(busModelsQuery.data ?? []),
        [busModelsQuery.data],
    );

    const busFormValues = useMemo<AutoTransFormData | null>(() => {
        const busData = busQuery.data;

        return busData
            ? {
                  ...busData,
                  park_id: parkOptions?.find(
                      (park) => park.value === busData?.park_id,
                  ),
                  bus_model_id: busModelOptions?.find(
                      (el) => el.value === busData?.bus_model_id,
                  ),
                  region: regionOptions?.find(
                      (el) => el.value === busData?.region,
                  ),
              }
            : null;
    }, [busQuery.data, parkOptions, busModelOptions, regionOptions]);

    useEffect(() => {
        busFormValues &&
            Object.keys(busFormValues)?.forEach(
                (key: keyof AutoTransFormData) => {
                    setValue(key, busFormValues?.[key]);
                },
            );
    }, [busFormValues]);

    const onSubmit = handleSubmit((data) => {
        const saveData: IAutoTransSave = {
            bus_id: busId ?? null,
            garage_number: data.park_no,
            gos_number: data.gos,
            tracker_imei: data.tracker_id,
            model_id: data.bus_model_id?.value as number,
            parkId: data.park_id?.value as number,
            region_id: (data.region?.value ?? userInfo?.region?.id) as number,
            sim_number: data.sim_number as string,
            license_number: data.license_number ?? null,
            made_date: data.made_date ? dateToString(data.made_date) : null,
            insurance_expire_date: data.insurance_expire_date
                ? dateToString(data.insurance_expire_date)
                : null,
            insurance_number: data.insurance_number ?? null,
            license_expire_date: data.license_expire_date
                ? dateToString(data.license_expire_date)
                : null,
            tex_number: data.tex_number ?? null,
            tex_expire_date: data.tex_expire_date
                ? dateToString(data.tex_expire_date)
                : null,
            remark: data.remark ?? null,
        };

        saveMutation.mutate(saveData);
    });

    const isLoading =
        busQuery.isLoading ||
        parksQuery.isLoading ||
        regionQuery.isLoading ||
        busModelsQuery.isLoading;

    return {
        control,
        errors,
        parkOptions,
        busModelOptions,
        regionOptions,
        onSubmit,
        isLoading,
        register,
    };
};
