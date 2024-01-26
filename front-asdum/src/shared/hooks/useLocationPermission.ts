import {useLocation} from 'react-router-dom';

import {useAuthStore} from '../store/auth';

const useLocationPermission = (routeName?: string) => {
    const location = useLocation();
    const userInfo = useAuthStore((state) => state.userInfo);
    const pathName = location.pathname;

    const foundPermission = userInfo?.front_urls?.find((item) => {
        if (routeName) {
            return routeName.includes(item.url);
        } else {
            const pathRoute = pathName.split('/').pop() || pathName;
            return pathRoute.includes(item.url);
        }
    });

    const canEdit =
        foundPermission?.permission === 2 || foundPermission?.permission === 3;
    const canView = foundPermission?.permission === 1;
    const canDelete = foundPermission?.permission === 3;

    return {
        foundPermission,
        canEdit,
        canDelete,
        canView,
    };
};

export default useLocationPermission;
