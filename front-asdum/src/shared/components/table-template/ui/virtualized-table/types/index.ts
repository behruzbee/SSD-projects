import {
    HeaderGroup,
    Row,
    TableBodyPropGetter,
    TableBodyProps,
    TablePropGetter,
    TableProps,
} from 'react-table';

export interface ITableProps {
    getTableProps: (
        propGetter?: TablePropGetter<object> | undefined,
    ) => TableProps;
    headerGroups: HeaderGroup<object>[];
    prepareRow: (row: Row<object>) => void;
    rows: Row<object>[];
    getTableBodyProps: (
        propGetter?: TableBodyPropGetter<object> | undefined,
    ) => TableBodyProps;
    virtualizedProps?: {
        height?: number;
        itemCount?: number;
        width?: number;
        itemSize?: number;
    };
}
