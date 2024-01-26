import {Radio} from '@mui/material';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import DialogWrapper from '@components/DialogWrapper';
import {useViolationRoadStore} from '@features/closed-road-violation';
import {ApproveStatus} from '@features/closed-road-violation/model/closed-road-violation.types';
import {notifyWarning} from '@shared/helpers/local_notification';

import style from './index.module.scss';
import {saveStatus} from './libs/saveStatus';

interface IModal {
    type: 'violation' | 'delay';
}
export const ViolationModal: FC<IModal> = ({type}) => {
    const [selected, approveRace, condition, reset] = useViolationRoadStore(
        (s) => [
            s.selectedApprove,
            s.setApproveRace,
            s.approveRace,
            s.resetStatus,
        ],
    );
    const statusSave = saveStatus(type);

    const {t} = useTranslation();

    function handleSubmit() {
        if (condition.status !== null && condition.status !== 'default') {
            statusSave.mutate({
                ...condition,
                id: selected?.id,
                type,
            });
        } else {
            notifyWarning(t('please_select_status'));
        }
    }

    const handleClose = () => {
        reset();
    };
    return (
        <DialogWrapper
            open={!!selected}
            onClose={handleClose}
            title={t('race_status')}
            isLoading={statusSave.isLoading}
            save={handleSubmit}
            contentClass={style.dcontent}
            width="496px"
            saveLabel={t('confirm')}
        >
            <div className={style.wrapper}>
                <div className={style.header}>
                    <span className={style.title}>{t('choose_status')}</span>
                    <div className={style.status}>
                        <div className={style.radio}>
                            <Radio
                                checked={condition.status === 'approved'}
                                onChange={() =>
                                    approveRace('status', 'approved')
                                }
                                value="approved"
                                id={'approved'}
                                name="radio-buttons"
                            />
                            <label
                                htmlFor="approved"
                                className={style.radioTxt}
                            >
                                {t('approve')}
                            </label>
                        </div>
                        <div className={style.radio}>
                            <Radio
                                checked={condition.status === 'declined'}
                                onChange={() =>
                                    approveRace('status', 'declined')
                                }
                                value="declined"
                                id={'declined'}
                                name="radio-buttons"
                            />
                            <label
                                htmlFor="declined"
                                className={style.radioTxt}
                            >
                                {t('decline')}
                            </label>
                        </div>
                    </div>
                </div>

                <div className={style.header}>
                    <span className={style.title}>{t('reason')}</span>
                    <textarea
                        placeholder={t('content')}
                        onBlur={(e) =>
                            approveRace(
                                'description',
                                e.target.value as ApproveStatus,
                            )
                        }
                        className={style.comment}
                    />
                </div>
            </div>
        </DialogWrapper>
    );
};
