import React, {FC} from 'react';
import {useTable} from 'react-table';

import styles from './index.module.scss';

type Props = {
    setData: (data: any) => void;
    data: any[];
    columns: any[];
};

const TableInstance: FC<Props> = ({setData, data, columns}) => {
    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        setData(
            data?.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...data[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            }),
        );
    };

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
            // @ts-ignore
            updateMyData,
        });

    return (
        <div className={styles.container}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            className={styles.theader}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    className={styles.th}
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr className={styles.tbody} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        className={styles.td}
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(TableInstance);
