import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {TypeProps} from '@features/edit-operation';
import {
    UpdateVehicleModelProps,
    vehicleModelUpdateScheme,
} from '@features/forms/update-busModel-form/model/schema';
import {ISaveFuelType} from '@models/fuel_type_model';
import {useAccessStore} from '@store/access_rights';

export const useAddFuelForm = (
    fuelTypeMutateS: UseMutationResult<AxiosResponse<ISaveFuelType>>,
    setModalOpen: (type: TypeProps, value: boolean) => void,
) => {
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<UpdateVehicleModelProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(vehicleModelUpdateScheme),
    });

    useEffect(() => {
        if (fuelTypeMutateS.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
        }
    }, [fuelTypeMutateS.isSuccess]);

    const handleClose = useCallback(() => {
        reset();
        setModalOpen('add', false);
        reset({name: '', remark: ''});
    }, [reset]);

    return {control, handleSubmit, reset, errors, setValue, handleClose};
};
