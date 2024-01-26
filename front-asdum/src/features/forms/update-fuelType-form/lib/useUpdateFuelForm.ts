import {yupResolver} from '@hookform/resolvers/yup';
import {useSelectedModel} from '@widgets/TablePageWrapper';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {UseMutationResult} from 'react-query';

import {TypeProps} from '@features/edit-operation/modals-manage/model/model';
import {
    UpdateVehicleModelProps,
    vehicleModelUpdateScheme,
} from '@features/forms/update-busModel-form/model/schema';
import {IFuelType, ISaveFuelType} from '@models/fuel_type_model';
import {useAccessStore} from '@store/access_rights';

export const useUpdateFuelForm = (
    updateFuelTypeMutateS: UseMutationResult<AxiosResponse<ISaveFuelType>>,
    setModalOpen: (type: TypeProps, value: boolean) => void,
    fuel: IFuelType,
) => {
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {clearSelected} = useSelectedModel();
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
        if (updateFuelTypeMutateS.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
            clearSelected();
        }
    }, [updateFuelTypeMutateS.isSuccess]);

    const handleClose = useCallback(() => {
        setModalOpen('edit', false);
        reset({name: '', remark: ''});
    }, []);

    useEffect(() => {
        if (fuel) {
            setValue('name', fuel.name);
            setValue('remark', fuel.remark);
        }
    }, [fuel]);

    return {control, handleSubmit, errors, handleClose};
};
