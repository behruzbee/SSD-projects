import React, {FC, ReactNode} from 'react';

import useAuthPermit from '@api/auth/hooks';
import {Loader} from '@components/Loader';

interface IGetUserDataProps {
    children: ReactNode;
}
export const GetUserData: FC<IGetUserDataProps> = ({children}) => {
    const {isLoading} = useAuthPermit();
    if (isLoading) {
        return <Loader />;
    }
    return <>{children}</>;
};
