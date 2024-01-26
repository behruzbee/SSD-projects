import React from 'react';

import s from '@components/table-template/ui/virtualized-table/index.module.scss';
import {ITableProps} from '@components/table-template/ui/virtualized-table/types';

export const OrdinaryTable = ({
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    getTableBodyProps,
}: ITableProps) => {
    return (
        <table {...getTableProps()}>
            <thead className={s.stickyHeader}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <div>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
