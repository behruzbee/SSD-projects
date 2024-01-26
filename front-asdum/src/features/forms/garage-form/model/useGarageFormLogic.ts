import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useMemo, useState} from 'react';
import {Path, useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import useRegion from '@api/region/hooks';
import {IGarage, ISaveGarage} from '@models/garage_model';
import {handleOption} from '@shared/helpers/helpers';
import {notifyWarning} from '@shared/helpers/local_notification';
import {useHandleIsAdmin} from '@shared/hooks/useHandleIsAdmin';
import {useAuthStore} from '@shared/store/auth';

import {GarageFormData, schema} from '../lib/schema';

export const useGarageFormLogic = (
    selectedGarage: IGarage,
    mapRef: any,
    saveGarage: UseMutationResult<AxiosResponse, unknown, ISaveGarage>,
) => {
    const [coordinates, setCoordinates] = useState<number[][][]>(
        selectedGarage?.coords ? [selectedGarage?.coords] : [],
    );

    const {isSuperAdmin} = useHandleIsAdmin();
    const userInfo = useAuthStore((s) => s.userInfo);
    const regionsQuery = useRegion();

    const regionOptions = useMemo(
        () => handleOption(regionsQuery.data ?? []),
        [regionsQuery.data],
    );

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<GarageFormData, Path<GarageFormData>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(schema(isSuperAdmin)),
    });

    useEffect(() => {
        if (selectedGarage?.id) {
            const regionValue = regionOptions?.find(
                (el) => el.value === selectedGarage?.region_id,
            );

            setValue('garage_name', selectedGarage.name);
            setValue('region_id', regionValue);
        }
    }, [selectedGarage, regionOptions]);
    useEffect(() => {
        if (selectedGarage?.coords && mapRef) {
            console.log('Selected garage: ', selectedGarage, mapRef);
            // mapRef?.setCenter(selectedGarage?.coords[0], 15);
        }
    }, [selectedGarage?.coords, mapRef]);

    const instanceRef = (ref: any) => {
        if (ref) {
            ref.editor.startDrawing();
            ref.geometry.events.add('change', (e: any) => {
                setCoordinates(e.get('newCoordinates'));
            });
        }
    };

    const save = handleSubmit((data) => {
        if (!coordinates[0]?.length) {
            notifyWarning('Создайте полигон!');
            return;
        }

        let saveData: ISaveGarage | null = null;
        const coords = coordinates[0].map((v) => ({lat: v[0], lng: v[1]}));

        if (selectedGarage?.id) {
            saveData = {
                coords,
                garage_name: data.garage_name,
                id: selectedGarage.id,
                region_id:
                    data.region_id?.value ?? (userInfo.region?.id as number),
                parks: selectedGarage.parks,
            };
        } else {
            saveData = {
                coords,
                garage_name: data.garage_name,
                region_id:
                    data.region_id?.value ?? (userInfo.region?.id as number),
                parks: [],
                id: null,
            };
        }

        saveData && saveGarage.mutate(saveData);
    });

    return {
        control,
        errors,
        regionOptions,
        instanceRef,
        resetPolygon: () => setCoordinates([]),
        save,
        coordinates,
        isLoading: regionsQuery.isLoading,
    };
};
