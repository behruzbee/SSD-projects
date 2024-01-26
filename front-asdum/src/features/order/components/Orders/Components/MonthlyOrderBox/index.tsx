import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {ScrollArea} from '@components/scroll-area';
import {MonthlyCardItem} from '@features/order/components/MonthlyCardItem';
import {monthlyRouteExchangeModel} from '@models/route_exchange_model';
import {notifyWarning} from '@shared/helpers/local_notification';
import {useOrderStore} from '@shared/store/order';

interface IMonthlyBox {
    data: monthlyRouteExchangeModel[];
}
export function MonthlyOrderBox({data}: IMonthlyBox) {
    const {t} = useTranslation();

    const {
        routeId,
        expanded,
        setMOrder,
        setOpenEditMonthlyM,
        setEditSelectedRange,
    } = useOrderStore((state) => state);
    return (
        <ScrollArea maxHeight={'72vh'}>
            <div
                className={cx(
                    'grid__wrap',
                    'rg_16',
                    'cg_30',
                    'v__overflow',
                    'p_10',
                )}
            >
                {data
                    ? data.map((item: any, index: number) => {
                          return (
                              <MonthlyCardItem
                                  key={item.graph_id}
                                  index={index + 1}
                                  handleClick={() => {
                                      if (routeId === 0 || !expanded) {
                                          notifyWarning(
                                              t('please_select_route'),
                                          );
                                      } else {
                                          setMOrder(item);
                                          setOpenEditMonthlyM(true);
                                          setEditSelectedRange({
                                              from: new Date(item.from_date),
                                              to: new Date(item?.to_date),
                                          });
                                      }
                                  }}
                                  {...item}
                              />
                          );
                      })
                    : null}
            </div>
        </ScrollArea>
    );
}
