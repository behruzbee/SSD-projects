import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';
import shallow from 'zustand/shallow';

import {useModalManageStore} from '@features/edit-operation';
import {
    UpdateVehicleModelProps,
    vehicleModelUpdateScheme,
} from '@features/forms/update-busModel-form/model/schema';
import {IUpdateBusModel} from '@models/bus_model';
import {useAccessStore} from '@store/access_rights';

export const useBusModelForm = (
    busModelMutationS: UseMutationResult<AxiosResponse<IUpdateBusModel>>,
) => {
    const {setModalOpen} = useModalManageStore((state) => state, shallow);
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<UpdateVehicleModelProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(vehicleModelUpdateScheme),
    });

    const handleClose = useCallback(() => {
        reset();
        setModalOpen('add', false);
        reset({name: '', remark: ''});
    }, [reset]);

    useEffect(() => {
        if (busModelMutationS.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
        }
    }, [busModelMutationS.isSuccess]);

    return {
        control,
        errors,
        reset,
        handleSubmit,
        handleClose,
    };
};
