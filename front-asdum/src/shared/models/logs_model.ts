export interface ILogDatas {
    entityType: string;
    host: string;
    action: string;
    entityId: number | null;
    userName: 'string';
    userId: number;
    timestamp: number | string;
    index?: number;
}
