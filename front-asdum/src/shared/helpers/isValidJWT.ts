import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import {TOKEN} from '@shared/constants';

export const isValidJWT = (jwt_token: string | undefined): boolean => {
    if (!jwt_token) return false;

    try {
        return Boolean(jwt_decode(jwt_token));
    } catch (error) {
        console.error('invalid_JWT', error);
        Cookies.remove(TOKEN.AUTH_TOKEN);
        return false;
    }
};
