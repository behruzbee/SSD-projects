import React from 'react';
import {useTranslation} from 'react-i18next';

import ComponentWithLabel from '@components/ComponentWithLabel';
import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {usePositionOperations} from '@features/forms/positions-form';
import {usePositionData} from '@features/forms/positions-form/lib/usePositionData';
import {usePositionForm} from '@features/forms/positions-form/model/usePositionForm';

import s from './index.module.scss';

export const AddPositionForm = () => {
    const {t} = useTranslation();
    const {savePosition, handleCloseModal} = usePositionOperations();
    const {errors, control, save} = usePositionForm(savePosition);
    const {positionText} = usePositionData();
    const {addModalOpen} = useModalManageStore((state) => state);
    return (
        <DialogWrapper
            open={addModalOpen}
            onClose={handleCloseModal}
            title={positionText.title}
            saveLabel={positionText.saveLabel}
            save={save}
            width={700}
            isLoading={savePosition.isLoading}
            isForm
        >
            <div className={s.formElemWrap}>
                <ComponentWithLabel label={t('ID')}>
                    <InputController
                        name="id"
                        disabled={true}
                        control={control}
                        size={'small'}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('position_name')}>
                    <InputController
                        name="name"
                        control={control}
                        size={'small'}
                        message={errors.name?.message}
                    />
                </ComponentWithLabel>
            </div>
        </DialogWrapper>
    );
};
