import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DialogWrapper from '@components/DialogWrapper';
import {
    SelectedCheckbox,
    useSelectedCheckbox,
} from '@features/selected-checkbox';
import {IBusModelJSON} from '@models/bus_model';
import DataLoading from '@shared/hoc/DataLoading';
import {useDiffNormStore} from '@store/race_fuel';

import s from './index.module.scss';
import {useBusModelsHook} from './model';

const BusModels = () => {
    const {t} = useTranslation();
    const [isModelOpen, setModelOpen] = useDiffNormStore(
        (s) => [s.isModelOpen, s.setModelOpen],
        shallow,
    );
    const {busModelData, dataLoading, isLoading, handleSubmit} =
        useBusModelsHook();
    const {isChecked} = useSelectedCheckbox<IBusModelJSON>();

    return (
        <DialogWrapper
            open={isModelOpen}
            onClose={setModelOpen}
            title={t('model_trans')}
            save={handleSubmit}
            isLoading={isLoading}
            contentClass={s.dcontent}
        >
            <div className={s.wrapper}>
                <div className={s.header}>
                    <span className={s.title}>{t('naming')}</span>
                </div>
                <DataLoading loading={dataLoading} data={busModelData}>
                    {busModelData?.map((model) => (
                        <div
                            key={model.id}
                            className={
                                isChecked(model) ? s.selected : s.element
                            }
                        >
                            <SelectedCheckbox row={model} />
                            <span>{model.name}</span>
                        </div>
                    ))}
                </DataLoading>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(BusModels);
