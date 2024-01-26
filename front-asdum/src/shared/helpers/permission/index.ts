import {useAuthStore} from '@shared/store/auth';

export const usePermissionChecker = (permission: string): boolean => {
    const userInfo = useAuthStore((state) => state.userInfo);
    const permissions = userInfo?.permissions;
    return permissions ? permissions.includes(permission) : false;
};

export const permissionChecker = (
    permission: string,
    permissionsList: string[] | undefined,
): boolean => {
    return permissionsList ? permissionsList.includes(permission) : false;
};
