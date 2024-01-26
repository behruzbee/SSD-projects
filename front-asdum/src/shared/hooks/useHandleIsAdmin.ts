import {useAuthStore} from '@store/auth';

export const useHandleIsAdmin = () => {
    const userInfo = useAuthStore((state) => state.userInfo);

    const isSuperAdmin = userInfo.roleId === 1;
    const isAdmin = userInfo.roleId === 24;

    return {isSuperAdmin, isAdmin};
};
