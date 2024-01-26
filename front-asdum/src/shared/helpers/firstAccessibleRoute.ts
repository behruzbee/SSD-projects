import {IRoute} from '@models/route_type';

export const findAccessibleRoute = (routes: IRoute[]) => {
    return routes.find((route) => route.permission)?.path;
};
