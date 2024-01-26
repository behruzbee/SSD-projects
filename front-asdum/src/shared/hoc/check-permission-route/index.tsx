import React, {FC} from 'react';

import {NoAccess} from '@components/no-access';

interface ICheckPermissionRoute {
    permission: boolean;
    component: JSX.Element;
    isLink?: boolean;
}
export const CheckPermissionRoute: FC<ICheckPermissionRoute> = ({
    component,
    permission,
    isLink,
}) => {
    if (isLink && !permission) {
        return null;
    }

    if (!permission) {
        return <NoAccess />;
    }
    return component;
};
