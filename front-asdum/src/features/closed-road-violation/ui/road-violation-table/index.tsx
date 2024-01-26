import React from 'react';
import {CellProps} from 'react-table';

import {TableTemplateComponent} from '@components/table-template';
import {useGetRoadHistory} from '@features/closed-road';
import {TableDataType} from '@features/closed-road-violation';

import {useColumns} from '../../libs/columns';
import {useViolationRoadStore} from '../../model/closed-road-violation.store';
import {RoadViolationMap} from '../road-violation-map';

export const RoadViolationTable = () => {
    const columns = useColumns();
    const {refetch, isFetching, isFetched} = useGetRoadHistory();
    const [
        data,
        page,
        setPage,
        totalCount,
        clearHistoryPolyline,
        term,
        filterClosedRoad,
        clearClosedLayer,
    ] = useViolationRoadStore((s) => [
        s.tableData,
        s.page,
        s.setPage,
        s.totalCount,
        s.clearHistoryPolyline,
        s.searchTerm,
        s.filterClosedRoad,
        s.clearClosedRoadLayer,
    ]);
    const handleClick = ({row}: CellProps<TableDataType>, checked: boolean) => {
        clearHistoryPolyline();
        if (!checked) {
            refetch();
            filterClosedRoad(row.original);
        } else {
            clearHistoryPolyline();
            clearClosedLayer();
        }
    };

    return (
        <>
            <TableTemplateComponent
                columns={columns}
                disabled={isFetching}
                withActions={{mark: true}}
                data={data}
                withFilter
                handleCheckboxClick={handleClick}
                withPagination={
                    !!!term.value && {page, setPage, totalCount, size: 10}
                }
            />
            <div>
                <RoadViolationMap isLoading={isFetching} fetched={isFetched} />
            </div>
        </>
    );
};
