import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import shallow from 'zustand/shallow';

import useByPark from '@api/park/useByPark';
import RouteItem from '@shared/components/RouteItem';
import {useOrderStore} from '@store/order';

import styles from './index.module.scss';

const RouteList = () => {
    const {isLoading, dataRoutes, isFetching} = useByPark();
    const {routeId, setRouteId} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );

    const handleId = (id: number) => {
        console.log('ID: ', id);
        setRouteId(id);
    };

    return (
        <div className={styles.container}>
            {isLoading || isFetching ? (
                <div className="center">
                    <CircularProgress />
                </div>
            ) : (
                dataRoutes &&
                dataRoutes.map((route) => (
                    <RouteItem
                        key={route.route_id}
                        handleId={() => handleId(route.route_id)}
                        selected={routeId === route.route_id}
                        id={route.route_id}
                        name={route.route_name}
                    />
                ))
            )}
        </div>
    );
};

export default RouteList;
