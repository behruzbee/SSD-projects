import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

import {TOKEN} from '@shared/constants';

type jwtProp = {
    exp: number;
    iat: number;
    sub: string;
};

export const checkAuth = (): boolean => {
    let decoded: jwtProp = {} as jwtProp;
    const token = Cookies.get(TOKEN.AUTH_TOKEN);
    try {
        decoded = jwt<jwtProp>(token as string);
    } catch (e) {
        decoded = {} as jwtProp;
    }
    const isValid = !!decoded?.exp && !!decoded?.iat && !!decoded?.sub;
    return isValid && !!token;
};
