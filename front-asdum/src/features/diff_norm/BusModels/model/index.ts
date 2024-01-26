import {useEffect, useMemo} from 'react';
import shallow from 'zustand/shallow';

import {useAllBusModel} from '@api/bus_model/hooks';
import {useSaveModels} from '@api/diff_norm/mutations';
import {useSelectedCheckbox} from '@features/selected-checkbox';
import {IBusModelJSON} from '@models/bus_model';
import {useDiffNormStore} from '@store/race_fuel';

export const useBusModelsHook = () => {
    const {isLoading: dataLoading, data} = useAllBusModel();
    const [setModelOpen, routeData] = useDiffNormStore(
        (s) => [s.setModelOpen, s.routeData],
        shallow,
    );
    const handleSave = useSaveModels(setModelOpen);
    const {setSelected, selected} = useSelectedCheckbox<IBusModelJSON>();

    const busModelData = useMemo(
        () => data?.map((v) => ({...v, col1: v.id})),
        [data],
    );
    useEffect(() => {
        if (busModelData?.length) {
            setSelected(
                busModelData?.filter((item) =>
                    routeData?.diffNormItems?.some(
                        (el) => el.bus_model_id === item.id,
                    ),
                ),
            );
        }
    }, [busModelData]);

    const handleSubmit = () => {
        const deletedModels = routeData?.diffNormItems
            ?.filter(
                (item) => !selected.some((el) => el.id === item.bus_model_id),
            )
            ?.map((v) => ({id: v.bus_model_id, delete: true}));

        const saveData = {
            route_id: routeData.route_id,
            bus_model_ids: selected
                ?.map((el) => ({id: el.id}))
                .concat(deletedModels),
        };

        handleSave.mutate(saveData);
    };

    return {
        busModelData,
        dataLoading,
        isLoading: handleSave.isLoading,
        handleSubmit,
    };
};
