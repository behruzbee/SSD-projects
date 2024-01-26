import React from 'react';
import {useTranslation} from 'react-i18next';

import ComponentWithLabel from '@components/ComponentWithLabel';
import DialogWrapper from '@components/DialogWrapper';
import {InputController} from '@components/InputController';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {useFormOperations} from '@features/forms/koef-form/lib/useFormOperations';
import {useKoefFormData} from '@features/forms/koef-form/lib/useKoefFormData';
import {useKoefForm} from '@features/forms/koef-form/model/useKoefForm';
import s from '@features/forms/positions-form/ui/index.module.scss';

export const KoefAddForm = () => {
    const {t} = useTranslation();
    const {addModalOpen} = useModalManageStore((state) => state);
    const {handleCloseModal, saveKoef} = useFormOperations();
    const {save, errors, control} = useKoefForm(saveKoef);
    const {koefText} = useKoefFormData();

    return (
        <DialogWrapper
            open={addModalOpen}
            onClose={handleCloseModal}
            title={koefText.title}
            saveLabel={koefText.saveLabel}
            save={save}
            width={700}
            isLoading={saveKoef.isLoading}
            isForm
        >
            <div className={s.formElemWrap}>
                <ComponentWithLabel label={t('name')}>
                    <InputController
                        name="coefficient"
                        control={control}
                        size={'small'}
                        message={errors.coefficient?.message}
                    />
                </ComponentWithLabel>
                <ComponentWithLabel label={t('koefficient')}>
                    <InputController
                        name="amount"
                        type={'number'}
                        control={control}
                        size={'small'}
                        message={errors.amount?.message}
                    />
                </ComponentWithLabel>
            </div>
        </DialogWrapper>
    );
};
