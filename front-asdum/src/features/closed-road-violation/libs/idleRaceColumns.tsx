import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Column} from 'react-table';

import {TextCropper} from '@components/text-cropper';
import {StatisticsPermission} from '@shared/constants/permissions/statistics.permission';
import {secondParser} from '@shared/helpers/secondParser';
import {timeParser} from '@shared/helpers/timeParser';
import {CheckPermissionComponent} from '@shared/hoc/check-permission-component';

import {useViolationRoadStore} from '../model/closed-road-violation.store';
import {IdleTableDataType} from '../model/closed-road-violation.types';
import {RoadViolationSearch} from '../ui/road-violation-search';
import {StatusBtn} from '../ui/status-button';

export const useIdleColumns = () => {
    const {t} = useTranslation();
    const [setSelectedApprove] = useViolationRoadStore((s) => [
        s.setSelectedApprove,
    ]);

    const columns: Column<IdleTableDataType>[] = useMemo(
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
                    Cell: ({row}) =>
                        timeParser(row.original.from_time, 'HH:mm:ss'),
                    Filter: '',
                },

                {
                    Header: t('direction') as string,
                    columns: [
                        {
                            Header: t('КПП 1') as string,
                            accessor: 'kpp1_name',
                            width: 150,
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
                    Header: t('time') as string,
                    columns: [
                        {
                            Header: t('plan') as string,
                            accessor: 'plan_time',
                            Cell: ({row}) =>
                                secondParser(row.original.plan_time),
                            Filter: '',
                        },
                        {
                            Header: t('fact') as string,
                            accessor: 'fact_time',
                            Cell: ({row}) =>
                                secondParser(row.original.fact_time),
                            Filter: '',
                        },
                    ],
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
                                            setSelectedApprove(
                                                row.original as any,
                                            )
                                        }
                                        status={row.original.status}
                                    />
                                }
                            />
                        );
                    },
                    Filter: '',
                },
            ] as Column<IdleTableDataType>[],
        [t],
    );

    return columns;
};
