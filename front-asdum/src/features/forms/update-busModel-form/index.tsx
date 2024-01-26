import {useSelectedModel} from '@widgets/TablePageWrapper';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useBusModelMutationS} from '@api/bus_model/mutations';
import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import {useModalManageStore} from '@features/edit-operation';
import {IBusModelJSON} from '@models/bus_model';
import DataLoading from '@shared/hoc/DataLoading';
import {useBusModelStore} from '@store/bus_model';

import styles from './index.module.scss';
import {useBusUpdateForm} from './lib/useBusUpdateForm';
import {UpdateVehicleModelProps} from './model/schema';

interface IBusModelUpdate {
    loading: boolean;
}

const BusModelUpdate: FC<IBusModelUpdate> = ({loading}) => {
    const {t} = useTranslation();
    const fuelOptions = useBusModelStore((state) => state.fuelOptions);
    const {selected: busModel} = useSelectedModel<IBusModelJSON>();
    const editModalOpen = useModalManageStore((state) => state.editModalOpen);

    const busModelMutationS = useBusModelMutationS();
    const {control, handleSubmit, handleClose, errors} =
        useBusUpdateForm(busModelMutationS);
    const onSubmit = (data: UpdateVehicleModelProps) => {
        setTimeout(() => {
            busModelMutationS.mutate({
                id: busModel?.id,
                name: data?.name,
                remark: data?.remark,
                type_of_fuel: data?.type_of_fuel,
                toplivo: +data?.toplivo,
            });
        }, 100);
    };
    return (
        <DialogWrapper
            open={editModalOpen}
            isLoading={busModelMutationS.isLoading}
            onClose={handleClose}
            title={t('edit_model')}
            save={handleSubmit(onSubmit)}
            isForm
            width="450px"
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
                                defaultValue={busModel?.name || ''}
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
                                defaultValue={busModel?.remark || ''}
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

export default React.memo(BusModelUpdate);
