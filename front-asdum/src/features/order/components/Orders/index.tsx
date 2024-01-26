import {OrderTab} from '@entities/order-tabs';
import cx from 'classnames';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Outlet, useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import useByRoute from '@api/route_exchange/useByRoute';
import DayPickerComponent from '@components/DayPicker';
import {DayRangePicker} from '@components/DayRangePicker';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {doesIncludePathname} from '@shared/helpers/doesIncludePathname';
import {useOrderStore} from '@store/order';

import EditOrder from '../EditOrder';
import styles from './index.module.scss';

const Orders = () => {
    const {t} = useTranslation();
    const [date, setDate, selectedRange, setSelectedRange, setOrderMode] =
        useOrderStore(
            (s) => [
                s.date,
                s.setDate,
                s.selectedRange,
                s.setSelectedRange,
                s.setOrderMode,
            ],
            shallow,
        );
    useByRoute();

    const {editModalOpen} = useModalManageStore((state) => state);

    const locationPath = useLocation().pathname;
    useEffect(() => {
        setOrderMode(
            doesIncludePathname(locationPath, 'monthly') ? 'monthly' : 'daily',
        );
    }, [locationPath]);
    const mainPaths = useMemo<Array<{title: string; path: string}>>(
        () => [
            {title: t('day'), path: '/manage/order'},
            {title: t('month'), path: 'monthly-reinforcement'},
            {title: t('history'), path: 'reinforcement-log'},
        ],
        [t],
    );

    const historyPaths = useMemo<Array<{title: string; path: string}>>(
        () => [
            {title: t('every_day'), path: '/manage/order/reinforcement-log'},
            {
                title: t('every_month'),
                path: '/manage/order/reinforcement-log/monthly',
            },
        ],
        [t],
    );
    return (
        <div
            className={cx(
                styles.container,
                !doesIncludePathname(locationPath, 'log') ? styles.gap : '',
            )}
        >
            {editModalOpen ? <EditOrder /> : null}
            <div className="flex__space" style={{background: '#F5F5F5'}}>
                <div className={cx(styles.orderNavWrap)}>
                    <OrderTab data={mainPaths} />
                    {doesIncludePathname(locationPath, 'monthly') ||
                    doesIncludePathname(locationPath, 'log') ? (
                        <div className={cx(styles.orderTimeWrap)}>
                            <DayRangePicker
                                selectedRange={selectedRange}
                                handleRangeSelect={setSelectedRange}
                            />
                        </div>
                    ) : (
                        <div className={cx(styles.orderTimeWrap)}>
                            <DayPickerComponent
                                myDate={date}
                                setMyDate={setDate}
                                width={150}
                            />
                        </div>
                    )}
                </div>
            </div>
            {doesIncludePathname(locationPath, 'log') ? (
                <div style={{width: 'fit-content'}}>
                    <OrderTab data={historyPaths} />
                </div>
            ) : null}
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Orders;
