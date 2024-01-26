import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import shallow from 'zustand/shallow';

import {useSaveStation} from '@src/shared/api/stations_list/mutations';
import {IStation} from '@src/shared/models/station_model';
import {useMainStore} from '@src/shared/store/main';
import {useStationsListStore} from '@src/shared/store/stations_list';

import {ISubmitStation} from '../../lib';

type Coords = {lat: number; lng: number; id?: string | number};

export const useAddFormLogic = (coords: Coords) => {
    const [stationState, setStationState] = useState<IStation>({} as IStation);

    const addNewStation = useStationsListStore((state) => state.addNewStation);
    const {open, handleTap} = useMainStore((state) => state, shallow);
    const saveStation = useSaveStation();

    const {control, handleSubmit, reset} = useForm<ISubmitStation>();

    useEffect(() => {
        reset();
    }, [open]);

    useEffect(() => {
        if (saveStation.isSuccess && saveStation.data.data?.data?.id) {
            addNewStation({
                ...stationState,
                id: saveStation.data.data?.data.id,
            });
            handleTap(false);
        }
    }, [saveStation.isSuccess]);

    const onSubmit = (data: ISubmitStation) => {
        const saveData = {
            id: null as any,
            lat: coords.lat,
            lng: coords.lng,
            name: data?.name,
            remark: data?.remark || '',
            stat_uniq_id: parseInt(data?.stat_uniq_id as any) || null,
            station_type: data?.station_type?.value || 1,
            routes: data?.routesInputs
                ?.filter(
                    (routes, i) =>
                        routes.route !== '' &&
                        data?.routesInputs.indexOf(routes) === i,
                )
                ?.map((routes) => routes.route.toUpperCase()),
        };
        if (saveData.name) {
            setStationState(saveData);
            saveStation.mutate(saveData);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        control,
        saveStation,
    };
};
