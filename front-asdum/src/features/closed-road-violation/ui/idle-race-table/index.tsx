import React from 'react';

import {VirtualizedTableTemplateComponent} from '@components/table-template/ui/virtualized-table';
import {useIdleColumns} from '@features/closed-road-violation/libs/idleRaceColumns';
import {useViolationRoadStore} from '@features/closed-road-violation/model/closed-road-violation.store';

import {RoadViolationMap} from '../road-violation-map';
import s from './index.module.scss';

export const IdleRaceTable = () => {
    const columns = useIdleColumns();
    const [data, page, setPage, totalCount, term] = useViolationRoadStore(
        (s) => [
            s.idleTableData,
            s.idlePage,
            s.setIdlePage,
            s.idleTotalCount,
            s.idleSearchTerm,
        ],
    );
    return (
        <div className={s.idleTableContainer}>
            <VirtualizedTableTemplateComponent
                columns={columns}
                disabled={false}
                withActions={{mark: false}}
                data={data}
                withPagination={
                    !term.value && {page, setPage, totalCount, size: 10}
                }
            />
            <div>
                <RoadViolationMap isLoading={false} fetched={false} />
            </div>
        </div>
    );
};
