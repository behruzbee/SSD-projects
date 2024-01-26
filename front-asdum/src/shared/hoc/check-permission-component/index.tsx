import {FC} from 'react';

import {useAuthStore} from '@shared/store/auth';

interface ICheckPermissionComponent {
    permission: string;
    component: JSX.Element;
}
export const CheckPermissionComponent: FC<ICheckPermissionComponent> = ({
    component,
    permission,
}) => {
    const userInfo = useAuthStore((state) => state.userInfo);
    const permissionsList = userInfo?.permissions;

    if (permissionsList) {
        if (permissionsList.includes(permission)) {
            return component;
        }

        return null;
    }

    return null;
};
