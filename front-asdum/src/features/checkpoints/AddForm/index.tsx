import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DialogWrapper from '@src/shared/components/DialogWrapper';

import {InputController} from '@components/InputController';
import SelectController from '@components/SelectController';
import {useMainStore} from '@store/main';
import {inputStyles, remarkStyles} from '@styles/components/helperStyles';

import {modalSelect} from '../lib/styles';
import {useTypeOptions} from '../lib/useTypeOptions';
import AddibleRoutes from '../modules';
import s from './index.module.scss';
import {useAddFormLogic} from './model';

type Props = {
    coords: {lat: number; lng: number; id?: string | number};
};

const AddModal: FC<Props> = ({coords}) => {
    const {t} = useTranslation();
    const {open, handleTap} = useMainStore((state) => state, shallow);
    const typeOptions = useTypeOptions();
    const {handleSubmit, onSubmit, control, saveStation} =
        useAddFormLogic(coords);

    return (
        <DialogWrapper
            open={open}
            onClose={() => handleTap(false)}
            title={t('route_setting')}
            save={handleSubmit(onSubmit)}
            isLoading={saveStation.isLoading}
            isForm
            width="540px"
        >
            <div className={s.wrapper}>
                <div className={s.element}>
                    <span>{t('field_name')}:</span>
                    <InputController
                        name="name"
                        control={control}
                        placeholder={t('field_name')}
                        sx={inputStyles}
                    />
                </div>
                <div className={s.element}>
                    <span>{t('unique_id')}:</span>
                    <InputController
                        name="stat_uniq_id"
                        control={control}
                        placeholder={t('unique_id')}
                        sx={inputStyles}
                    />
                </div>
                <div className={s.coords}>
                    <div className={s.element}>
                        <span>{t('longitude')}:</span>
                        <div className={s.data}>{coords.lng}</div>
                    </div>
                    <div className={s.element}>
                        <span>{t('latitude')}:</span>
                        <div className={s.data}>{coords.lat}</div>
                    </div>
                </div>
                <div className={s.element}>
                    <span>{t('type')}:</span>
                    <SelectController
                        name="station_type"
                        control={control}
                        options={typeOptions}
                        placeholder={t('type')}
                        nooptionsmessage={t('no_options')}
                        {...modalSelect}
                    />
                </div>
                <div className={s.element}>
                    <span>{t('remark_user')}:</span>
                    <InputController
                        control={control}
                        name="remark"
                        placeholder={t('remark_user') + '...'}
                        size="small"
                        type="textarea"
                        multiline
                        sx={remarkStyles}
                    />
                </div>
                <div className={s.element}>
                    <span style={{marginBottom: '6px'}}>{t('add_route')}</span>
                    <div className="routesWrapper">
                        <AddibleRoutes control={control} />
                    </div>
                </div>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(AddModal);
