import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useSelectedModel} from '@widgets/TablePageWrapper';
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
import {IBusModelJSON, IUpdateBusModel} from '@models/bus_model';
import {useAccessStore} from '@store/access_rights';

export const useBusUpdateForm = (
    busModelMutationS: UseMutationResult<AxiosResponse<IUpdateBusModel>>,
) => {
    const {selected: busModel, clearSelected} =
        useSelectedModel<IBusModelJSON>();
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {setModalOpen} = useModalManageStore((state) => state, shallow);
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
        if (busModel) {
            setValue('name', busModel.name);
            setValue('remark', busModel.remark);
            setValue('toplivo', busModel.toplivo);
        }
    }, [busModel]);

    useEffect(() => {
        if (busModelMutationS.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
            clearSelected();
        }
    }, [busModelMutationS.isSuccess]);

    const handleClose = useCallback(() => {
        setModalOpen('edit', false);
        reset({name: '', remark: ''});
    }, []);

    return {control, handleSubmit, errors, handleClose};
};
