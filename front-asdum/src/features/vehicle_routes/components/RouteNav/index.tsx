import cx from 'classnames';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import Etalon from '@src/images/svgs/Etalon';
import Passport from '@src/images/svgs/Passport';
import Protocol from '@src/images/svgs/Protocol';
import Schedule from '@src/images/svgs/Schedule';
import Scheme from '@src/images/svgs/Scheme';
import {useEditRouteStore} from '@src/shared/store/edit_route';

import {RouteModel} from '@models/route_model';
import {useRouteStore} from '@shared/store/route';

export const RouteNav = () => {
    const {t} = useTranslation();
    const [tab, setTab] = useEditRouteStore((s) => [s.tab, s.setTab], shallow);
    const selectedRoute = useRouteStore((s) => s.selectedRoute);
    const handleSwitch = (value: any) => {
        setTab(value);
    };
    const tabBtns = useMemo(() => {
        return [
            {
                name: t('passport'),
                img: <Passport />,
                value: '1',
                status: 'saved_passport',
            },
            {
                name: t('etalon'),
                img: <Etalon />,
                value: '2',
                status: 'saved_etalon',
            },
            {
                name: t('scheme'),
                img: <Scheme />,
                value: '3',
                status: 'saved_points',
            },
            {
                name: t('protocol'),
                img: <Protocol />,
                value: '4',
                status: 'saved_protocol',
            },
            {
                name: t('schedule'),
                img: <Schedule />,
                value: '5',
                status: 'saved_raspisaniya',
            },
        ];
    }, [t]);
    return (
        <div className="vehicleRouteTab">
            {tabBtns.map((item, index) => {
                return (
                    <button
                        key={index}
                        className={cx(
                            'vehicleRouteTab__btn',
                            selectedRoute &&
                                selectedRoute[
                                    item.status as keyof Pick<
                                        RouteModel,
                                        | 'saved_etalon'
                                        | 'saved_passport'
                                        | 'saved_points'
                                        | 'saved_raspisaniya'
                                        | 'saved_protocol'
                                    >
                                ]
                                ? 'savedRoutePart'
                                : '',
                            +tab === +item.value ? 'activeVehicleRouteTab' : '',
                        )}
                        onClick={() => handleSwitch(item.value)}
                    >
                        {item.img}
                        <span className="vehicleRouteTab__title">
                            {item.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

// {
//     name: t('details'),
//     img: <Detail />,
//     value: '4',
// },
