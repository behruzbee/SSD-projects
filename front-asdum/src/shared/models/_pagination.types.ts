export interface IPagination {
    page: number;
    size: number;
    totalCount: number;
    setPage: (page: number) => void;
    setTotalCount: (count: number) => void;
}
