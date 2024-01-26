import cx from 'classnames';
import React from 'react';
import {FixedSizeList} from 'react-window';

import s from '@components/table-template/ui/virtualized-table/index.module.scss';
import {ITableProps} from '@components/table-template/ui/virtualized-table/types';

export const VirtualizedTable = ({
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    getTableBodyProps,
    virtualizedProps,
}: ITableProps) => {
    const RenderRow = React.useCallback(
        //@ts-ignore
        ({index, style}) => {
            const row = rows[index];
            prepareRow(row);
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className={s.tr}
                >
                    {row.cells.map((cell) => {
                        return (
                            <div {...cell.getCellProps()} className={s.td}>
                                {cell.render('Cell')}
                            </div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows],
    );

    return (
        <div {...getTableProps()} className={s.table}>
            <div>
                {headerGroups.map((headerGroup) => {
                    return (
                        <div
                            {...headerGroup.getHeaderGroupProps({
                                style: {width: '100%'},
                            })}
                            className={cx(s.tr, s.tableHeader)}
                        >
                            {headerGroup.headers.map((column) => (
                                <div
                                    {...column.getHeaderProps()}
                                    className={s.th}
                                >
                                    {column.render('Header')}
                                    <div>
                                        {column.canFilter
                                            ? column.render('Filter')
                                            : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={500}
                    itemCount={rows.length}
                    itemSize={80}
                    {...virtualizedProps}
                >
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    );
};
