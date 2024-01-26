import {checkInternetStore} from '@entities/internet_connection';
import React, {FC, useEffect} from 'react';

import {NoInternetComponent} from './component';

interface ICheckInternet {
    children: React.ReactElement;
}
export const CheckInternetConnection: FC<ICheckInternet> = ({children}) => {
    const {isOnline, setIsOnline} = checkInternetStore((state) => state);

    useEffect(() => {
        setIsOnline(navigator.onLine);
    }, []);

    window.addEventListener('online', () => {
        setIsOnline(true);
    });

    window.addEventListener('offline', () => {
        setIsOnline(false);
    });

    if (isOnline) {
        return children;
    } else {
        return <NoInternetComponent />;
    }
};
