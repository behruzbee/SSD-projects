export interface SavePermission {
    roleId: number;
    permissions: IPermit[] | null;
}

interface IPermit {
    url: string;
    permission: null | number | string;
}
