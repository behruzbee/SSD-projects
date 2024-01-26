import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Column} from 'react-table';

import {TextCropper} from '@components/text-cropper';

import {useCRoadTbStore} from '../model/closedRTbData.store';
import {ICRoadTbData} from '../model/closedRTbData.types';

export const useColumns = () => {
    const {t} = useTranslation();
    const page = useCRoadTbStore((s) => s.page);
    const columns: Column<ICRoadTbData>[] = useMemo(
        () =>
            [
                {
                    Header: t('date') as string,
                    accessor: 'fromDate',
                    Cell: (props) =>
                        props.row.original.fromDate.concat(
                            ' - ',
                            props.row.original.toDate,
                        ),
                },
                {
                    Header: t('time') as string,
                    columns: [
                        {
                            Header: t('from') as string,
                            accessor: 'beginTime',
                        },
                        {
                            Header: t('to') as string,
                            accessor: 'endTime',
                        },
                    ],
                },
                {
                    Header: t('closed_street') as string,
                    accessor: 'streetName',
                },

                {
                    Header: t('plot') as string,
                    columns: [
                        {
                            Header: t('from') as string,
                            accessor: 'fromDirection',
                        },
                        {
                            Header: t('to') as string,
                            accessor: 'toDirection',
                        },
                    ],
                },
                {
                    Header: t('stations') as string,
                    columns: [
                        {
                            Header: t('to_center') as string,
                            accessor: 'toCenterStations',
                            Cell: ({row}) =>
                                row.original.toCenterStations.length,
                        },
                        {
                            Header: t('from_center') as string,
                            accessor: 'fromCenterStations',
                            Cell: ({row}) =>
                                row.original.fromCenterStations.length,
                        },
                    ],
                },
                {
                    Header: t('routes') as string,
                    accessor: 'routes',
                    Cell: (props) => (
                        <TextCropper
                            text={props.row.original.routes}
                            maxLength={10}
                            withTooltip
                        />
                    ),
                },
            ] as Column<ICRoadTbData>[],
        [t, page],
    );

    return columns;
};
