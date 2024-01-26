import Cookies from 'js-cookie';
import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {TOKEN} from '@shared/constants';
import {isValidJWT} from '@shared/helpers/isValidJWT';

const PublicRoute = () => {
    const location = useLocation();
    const authToken = Cookies.get(TOKEN.AUTH_TOKEN);

    if (isValidJWT(authToken)) {
        return (
            <Navigate
                to="monitoring"
                replace
                state={{path: location.pathname}}
            />
        );
    } else {
        return <Outlet />;
    }
};

export default PublicRoute;
