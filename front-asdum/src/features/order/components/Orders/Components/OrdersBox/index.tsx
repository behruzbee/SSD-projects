import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {ScrollArea} from '@components/scroll-area';
import {RouteExchangeModel} from '@models/route_exchange_model';
import {notifyWarning} from '@shared/helpers/local_notification';
import {useOrderStore} from '@shared/store/order';

import CardItem from '../OrderCardItem/index';

interface IOrdersBox<T> {
    data: T[];
    type: string;
}

export function OrdersBox<T extends RouteExchangeModel>(props: IOrdersBox<T>) {
    const {t} = useTranslation();
    const {data: cardDatas, type} = props;
    const {setOrder, setOpenM, routeId, expanded} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );
    return (
        <ScrollArea maxHeight={'72vh'}>
            <div
                className={cx(
                    'grid__wrap',
                    'rg_16',
                    'cg_30',
                    'v__overflow',
                    'p_10',
                    'overflow__scroll',
                )}
            >
                {cardDatas
                    ? cardDatas.map((item, index) => {
                          return (
                              <CardItem
                                  type={type}
                                  key={item.graph_id}
                                  index={index + 1}
                                  handleClick={() => {
                                      if (routeId === 0 || !expanded) {
                                          notifyWarning(
                                              t('please_select_route'),
                                          );
                                      } else {
                                          setOrder(item);
                                          setOpenM(true);
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
