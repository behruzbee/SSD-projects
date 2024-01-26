import {
    ColumnGroup,
    ColumnWithLooseAccessor,
    ColumnWithStrictAccessor,
} from 'react-table';

export type CustomColumn<D extends object = Record<string, unknown>> =
    | ColumnGroup<D>
    | ColumnWithLooseAccessor<D>
    | ColumnWithStrictAccessor<D>
    | {show?: boolean};
