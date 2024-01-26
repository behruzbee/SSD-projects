import {Chip} from '@entities/chip';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DataLoading from '@src/shared/hoc/DataLoading';

import {useCoefList, useDiffNormQuery} from '@api/diff_norm/hooks';
import {Card} from '@components/Card';
import {EditOperation} from '@features/edit-operation';
import {AddOperation} from '@features/edit-operation/ui';
import {DiffNormData} from '@models/diff_norm_models';
import {useDiffNormStore} from '@store/race_fuel';

import BusModels from '../BusModels';
import RouteModal from '../RouteModal';
import s from './index.module.scss';
import {ParkKoefficient} from './ui/park-koefficient';

const RoutesField = () => {
    useCoefList();
    const {t} = useTranslation();
    const [setRouteData, setRouteOpen, setModelOpen, isModelOpen, isRouteOpen] =
        useDiffNormStore(
            (s) => [
                s.setRouteData,
                s.setRouteOpen,
                s.setModelOpen,
                s.isModelOpen,
                s.isRouteOpen,
            ],
            shallow,
        );
    const diffNorm = useDiffNormQuery();

    const openModal = (routeData: DiffNormData, setOpen: () => void) => {
        setRouteData(routeData);
        setOpen();
    };

    const handleEditRoute = (data: DiffNormData) => {
        openModal(data, setRouteOpen);
    };

    const handleAdd = (routeData: DiffNormData) => {
        openModal(routeData, setModelOpen);
    };
    return (
        <div className={s.wrapper}>
            <DataLoading loading={diffNorm.isLoading} data={diffNorm.data}>
                <>
                    <ParkKoefficient />
                    {diffNorm.data?.map((routeData) => (
                        <Card
                            key={routeData.route_id}
                            title={`${t('route')} ${routeData.route_name}`}
                            cardOperations={[
                                <AddOperation
                                    onClick={() => handleAdd(routeData)}
                                    tooltipTitle={t('add_model')}
                                />,
                                <EditOperation
                                    tooltipTitle={t('edit_consumption')}
                                    onClick={() => handleEditRoute(routeData)}
                                />,
                            ]}
                        >
                            <div>
                                <Chip
                                    data={[
                                        ...routeData.diffNormItems.map(
                                            (item) => item.bus_model_name,
                                        ),
                                    ]}
                                />
                            </div>
                        </Card>
                    ))}
                </>
            </DataLoading>

            {isRouteOpen && <RouteModal />}
            {isModelOpen && <BusModels />}
        </div>
    );
};

export default RoutesField;
