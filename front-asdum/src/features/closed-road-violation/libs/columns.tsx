import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Column} from 'react-table';

import {TextCropper} from '@components/text-cropper';
import {StatisticsPermission} from '@shared/constants/permissions/statistics.permission';
import {CheckPermissionComponent} from '@shared/hoc/check-permission-component';

import {useViolationRoadStore} from '../model/closed-road-violation.store';
import {TableDataType} from '../model/closed-road-violation.types';
import {RoadViolationSearch} from '../ui/road-violation-search';
import {StatusBtn} from '../ui/status-button';

export const useColumns = () => {
    const {t} = useTranslation();
    const [setSelectedApprove] = useViolationRoadStore((s) => [
        s.setSelectedApprove,
    ]);
    const columns: Column<TableDataType>[] = useMemo(
        () =>
            [
                {
                    Header: t('route_number') as string,
                    accessor: 'route_name',
                    Filter: <RoadViolationSearch searchKey="route_name" />,
                },
                {
                    Header: t('garage_number') as string,
                    accessor: 'garage_number',
                    Filter: <RoadViolationSearch searchKey="garage_number" />,
                },
                {
                    Header: t('gos_number') as string,
                    accessor: 'gos_number',
                    Filter: <RoadViolationSearch searchKey="gos_number" />,
                },
                {
                    Header: t('time') as string,
                    accessor: 'from_time',
                    Filter: '',
                },

                {
                    Header: t('direction') as string,
                    columns: [
                        {
                            Header: t('КПП 1') as string,
                            accessor: 'kpp1_name',
                            Cell: ({row}) => (
                                <TextCropper
                                    maxLength={12}
                                    text={row.original.kpp1_name}
                                    withTooltip
                                />
                            ),
                            Filter: (
                                <RoadViolationSearch searchKey="kpp1_name" />
                            ),
                        },
                        {
                            Header: t('КПП 2') as string,
                            accessor: 'kpp2_name',
                            Cell: ({row}) => (
                                <TextCropper
                                    maxLength={12}
                                    text={row.original.kpp2_name}
                                    withTooltip
                                />
                            ),
                            Filter: (
                                <RoadViolationSearch searchKey="kpp2_name" />
                            ),
                        },
                    ],
                },
                {
                    Header: t('stations') as string,
                    columns: [
                        {
                            Header: t('plan') as string,
                            accessor: 'plan_stat_count',
                            Filter: '',
                        },
                        {
                            Header: t('fact') as string,
                            accessor: 'fact_stat_count',
                            Filter: '',
                        },
                    ],
                },
                {
                    Header: t('mileage') as string,
                    columns: [
                        {
                            Header: t('plan') as string,
                            accessor: 'plan_mileage',
                            Filter: '',
                        },
                        {
                            Header: t('fact') as string,
                            accessor: 'fact_mileage',
                            Filter: '',
                        },
                    ],
                },
                {
                    Header: t(' ') as string,
                    columns: [
                        // {
                        //     Header: t('stations') as string,
                        //     accessor: 'stations_count',
                        // },
                        {
                            Header: t('last_station') as string,
                            accessor: 'station',
                            Cell: ({row}) => (
                                <TextCropper
                                    text={row.original.station}
                                    withTooltip
                                />
                            ),
                            Filter: (
                                <RoadViolationSearch searchKey="kpp2_name" />
                            ),
                        },
                    ],
                },
                {
                    Header: t('percent_done') as string,
                    accessor: 'percent',
                    Cell: ({row}) => `${row.original.percent}%`,
                    Filter: '',
                },
                {
                    Header: t('status') as string,
                    accessor: 'status',
                    Cell: ({row}) => {
                        return (
                            <CheckPermissionComponent
                                permission={
                                    StatisticsPermission.ROAD_VIOLATION_UPDATE
                                }
                                component={
                                    <StatusBtn
                                        onClick={() =>
                                            setSelectedApprove(row.original)
                                        }
                                        status={row.original.status}
                                    />
                                }
                            />
                        );
                    },
                    Filter: '',
                },
            ] as Column<TableDataType>[],
        [t],
    );

    return columns;
};
