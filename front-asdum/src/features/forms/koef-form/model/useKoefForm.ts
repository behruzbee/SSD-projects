import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {DateRange} from 'react-day-picker';
import {Path, useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {koefficientSchema} from '@features/forms/koef-form/model/validation_schema';
import {CoefModel} from '@models/diff_norm_models';
import {useDiffNormStore} from '@store/race_fuel';

export const useKoefForm = (
    savePosition: UseMutationResult<AxiosResponse, unknown, any>,
) => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<CoefModel, Path<CoefModel>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(koefficientSchema()),
    });

    const save = handleSubmit((data) => {
        savePosition.mutate({...data});
    });
    const {selectedKoef, clearKoefStore} = useDiffNormStore((state) => state);
    const keys = Object.keys(selectedKoef || {});

    useEffect(() => {
        if (keys.length) {
            setValue('id', selectedKoef.id);
            Object.keys(selectedKoef).forEach((key: keyof CoefModel) => {
                setValue(key, selectedKoef[key]);
            });
        }
        return clearKoefStore;
    }, [selectedKoef.id]);

    return {save, control, errors, setValue, selectedRange, setSelectedRange};
};
