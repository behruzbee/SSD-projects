import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useBusModelMutationS} from '@api/bus_model/mutations';
import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import {useModalManageStore} from '@features/edit-operation';
import {UpdateVehicleModelProps} from '@features/forms/update-busModel-form/model/schema';
import DataLoading from '@shared/hoc/DataLoading';
import {useBusModelStore} from '@store/bus_model';

import styles from './index.module.scss';
import {useBusModelForm} from './lib/useBusModelForm';

interface IAddBusModel {
    loading: boolean;
}

const AddBusModel: FC<IAddBusModel> = ({loading}) => {
    const fuelOptions = useBusModelStore((state) => state.fuelOptions);
    const {t} = useTranslation();
    const addModalOpen = useModalManageStore((state) => state.addModalOpen);
    const busModelMutationS = useBusModelMutationS();
    const {control, errors, handleSubmit, handleClose} =
        useBusModelForm(busModelMutationS);
    const onSubmit = (data: UpdateVehicleModelProps) => {
        setTimeout(() => {
            busModelMutationS.mutate({
                name: data?.name,
                remark: data?.remark,
                type_of_fuel: 1,
                toplivo: +data?.toplivo,
            });
        }, 100);
    };

    return (
        <DialogWrapper
            open={addModalOpen}
            isLoading={busModelMutationS.isLoading}
            onClose={handleClose}
            title={t('add_model')}
            save={handleSubmit(onSubmit)}
            isForm
            width="500px"
        >
            <DataLoading loading={loading} data={fuelOptions}>
                <div className={styles.contentBlock}>
                    <div className={styles.block}>
                        <div className={styles.subBlock}>
                            <InputController
                                control={control}
                                name="name"
                                placeholder={t('name')}
                                size="small"
                                label={t('name')}
                                type="text"
                                styles={styles.input}
                                errors={errors.name?.type}
                                message={errors.name?.message}
                            />

                            <InputController
                                control={control}
                                name="remark"
                                placeholder={t('description')}
                                size="small"
                                label={t('description')}
                                type="text"
                                styles={styles.input}
                                message={errors.remark?.message}
                                errors={errors.remark?.type}
                            />

                            <SelectController
                                control={control}
                                placeholder={t('fuel_type')}
                                options={fuelOptions}
                                name={'toplivo'}
                                indicatorSeparator={{display: 'none'}}
                                placeHolder={{color: '#919191'}}
                            />
                        </div>
                    </div>
                </div>
            </DataLoading>
        </DialogWrapper>
    );
};

export default React.memo(AddBusModel);
