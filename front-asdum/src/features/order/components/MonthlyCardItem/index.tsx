import {getDate} from '@entities/raznaryadka';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {DeleteOperation, EditOperation} from '@features/edit-operation';
import {monthlyRouteExchangeModel} from '@models/route_exchange_model';
import {getDayCh} from '@shared/helpers/helpers';

import {OrderChip} from '../Order-chip';
import s from './index.module.scss';

interface IProps extends monthlyRouteExchangeModel {
    index: number;
    handleClick: () => void;
}

export const MonthlyCardItem = ({
    handleClick,
    graph_id,
    from_date,
    to_date,
    race,
    garage_number,
    model,
    gos,
    first_tab_number,
    second_tab_number,
    first_driver,
    second_driver,
    first_even,
    second_even,
}: IProps) => {
    const {t} = useTranslation();
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
                                            title={t('date')}
                                            subtitle={`${getDate(
                                                from_date,
                                            )} - ${getDate(to_date)}`}
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
                                            title={t('garage_number')}
                                            subtitle={garage_number.toString()}
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
                                            title={t('tab_number') + ' 1'}
                                            subtitle={first_tab_number}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('driver') + ' 1'}
                                            subtitle={first_driver}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('days_ch')}
                                            subtitle={getDayCh(first_even)}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('gos_no')}
                                            subtitle={gos}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <OrderChip
                                            title={t('tab_number') + ' 2'}
                                            subtitle={second_tab_number}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('driver') + ' 2'}
                                            subtitle={second_driver}
                                        />
                                    </td>
                                    <td>
                                        <OrderChip
                                            title={t('days_ch')}
                                            subtitle={getDayCh(second_even)}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className={s.orderTableActions}>
                            <EditOperation onClick={handleClick} />
                            <DeleteOperation
                                onClick={() => console.log('Delete')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
