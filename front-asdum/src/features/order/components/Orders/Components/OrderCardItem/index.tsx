import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {RouteExchangeModel} from '@src/shared/models/route_exchange_model';

import {DeleteOperation, EditOperation} from '@features/edit-operation';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {OrderChip} from '@features/order/components/Order-chip';
import {helper} from '@shared/helpers';

import * as s from './index.module.scss';

const {getDayCh} = helper;
interface IProps extends RouteExchangeModel {
    index: number;
    handleClick: () => void;
    type: string;
}

const CardItem = ({
    created,
    even,
    from_time,
    gos,
    graph_id,
    model,
    race,
    station,
    tab_number,
    garage_number,
    to_time,
    user_name,
    driver_name,
    type,
    handleClick,
}: IProps) => {
    const {t} = useTranslation();
    const {setModalOpen} = useModalManageStore((state) => state);
    const isLog = type === 'log';
    const handleEdit = () => {
        handleClick();
        setModalOpen('edit', true);
    };
    const deleteOrder = () => {
        handleClick();
        setModalOpen('delete', true);
    };
    return (
        <div className={s.cardBtn}>
            <div className={s.cardWrap}>
                <div className={s.cardHeader}>
                    <h4>
                        {t('graphic')} {graph_id}
                    </h4>
                </div>
                <div className={s.cardWrapper}>
                    <div className={s.cardBody}>
                        <div className={s.orderTableWrap}>
                            <table className={s.orderTable}>
                                <tr>
                                    <td>
                                        <OrderChip
                                            title={t('time')}
                                            subtitle={`${from_time}-${to_time}`}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('race')}
                                            subtitle={race.toString()}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('tab_number')}
                                            subtitle={tab_number}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('gos_no')}
                                            subtitle={gos}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('model')}
                                            subtitle={model}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <OrderChip
                                            title={t('garage_number')}
                                            subtitle={garage_number}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('start__from')}
                                            subtitle={station}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            maxLength={12}
                                            title={t('driver')}
                                            subtitle={driver_name}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('days_ch')}
                                            subtitle={getDayCh(even)}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('created')}
                                            subtitle={`${user_name} ${dayjs(
                                                created,
                                            ).format('DD-MM-YYYY HH:mm:ss')}`}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        {!isLog && (
                            <div className={s.orderTableActions}>
                                <EditOperation onClick={handleEdit} />
                                <DeleteOperation onClick={deleteOrder} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
