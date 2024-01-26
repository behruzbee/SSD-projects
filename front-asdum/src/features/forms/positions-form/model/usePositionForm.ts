import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useEffect} from 'react';
import {Path, useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {usePositionOperations} from '@features/forms/positions-form';
import {usePositionData} from '@features/forms/positions-form/lib/usePositionData';
import {positionValidation} from '@features/forms/positions-form/lib/validation_scheme';
import {PositionFormProps} from '@features/forms/positions-form/model/models';

export const usePositionForm = (
    savePosition: UseMutationResult<AxiosResponse, unknown, any>,
) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<PositionFormProps, Path<PositionFormProps>>({
        mode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(positionValidation()),
    });

    const save = handleSubmit((data) => {
        savePosition.mutate({...data, id: null});
    });
    const {selectedPosition} = usePositionData();
    const {clearPosition} = usePositionOperations();
    const keys = Object.keys(selectedPosition || {});

    useEffect(() => {
        if (keys.length) {
            setValue('id', selectedPosition.id);
            setValue('name', selectedPosition.name);
        }
        return clearPosition;
    }, [selectedPosition]);

    return {save, control, errors};
};
