import Cookies from 'js-cookie';
import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import Layout from '@src/layout/mainLayout';

import {TOKEN} from '@shared/constants';
import {isValidJWT} from '@shared/helpers/isValidJWT';

const PrivateRoute = () => {
    const location = useLocation();
    const authToken = Cookies.get(TOKEN.AUTH_TOKEN);

    if (isValidJWT(authToken)) {
        return (
            <Layout>
                <Outlet />
            </Layout>
        );
    } else {
        return <Navigate to="/" replace state={{path: location.pathname}} />;
    }
};

export default PrivateRoute;
