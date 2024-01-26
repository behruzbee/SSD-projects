import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import AddGreenBtn from '@components/AddGreenBtn';
import CMButton from '@components/CMButton';
import {ExportXLSX} from '@features/order/components/Orders/exportCsv';
import {RouteExchPermissions} from '@shared/constants/permissions/manage.permissions';
import {notifyWarning} from '@shared/helpers/local_notification';
import {permissionChecker} from '@shared/helpers/permission';
import {useAuthStore} from '@shared/store/auth';
import {useOrderStore} from '@shared/store/order';

import styles from './index.module.scss';

export const OrderBtns = () => {
    const {t} = useTranslation();
    const userInfo = useAuthStore((state) => state.userInfo);
    const {
        fetchCount,
        setFetchUp,
        setOpenS,
        routeId,
        expanded,
        selectedRange,
        orderMode,
        setOpenMonthlyM,
        setMonthlyFetchUp,
        monthlyFetchCount,
    } = useOrderStore((state) => ({...state}), shallow);
    return (
        <div className={cx('flex__start', 'gap_24', styles.btnContainer)}>
            {permissionChecker(
                RouteExchPermissions.ROUTE_EXCH_UPDATE,
                userInfo?.permissions,
            ) && (
                <AddGreenBtn
                    mode="primary"
                    onClick={() => {
                        if (routeId === 0 || !expanded) {
                            notifyWarning(t('please_select_route'));
                        } else {
                            if (orderMode === 'daily') {
                                setOpenS(true);
                            } else {
                                if (
                                    !(
                                        !!selectedRange?.from &&
                                        !!selectedRange?.to
                                    )
                                ) {
                                    notifyWarning('Выберите промежуток');
                                } else {
                                    setOpenMonthlyM(true);
                                }
                            }
                        }
                    }}
                />
            )}
            <CMButton
                className={cx('btn__gray', 'f_12')}
                icon={<CachedRoundedIcon />}
                text={t('reload')}
                onClick={() => {
                    if (orderMode === 'daily') {
                        setFetchUp(fetchCount + 1);
                    } else if (orderMode === 'monthly') {
                        setMonthlyFetchUp(monthlyFetchCount + 1);
                    }
                }}
            />
            <ExportXLSX fileName={t('bus_order')} />
        </div>
    );
};
