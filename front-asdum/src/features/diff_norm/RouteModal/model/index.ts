import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useSaveDiffNorm} from '@api/diff_norm/mutations';
import {useDiffNormStore} from '@store/race_fuel';

import EditableCell from '../../EditableCell';

export const useRouteModalHook = () => {
    const {t} = useTranslation();
    const {setRouteOpen, routeData} = useDiffNormStore(
        (state) => state,
        shallow,
    );
    const handleSave = useSaveDiffNorm(setRouteOpen);

    const data = useMemo(
        () =>
            routeData?.diffNormItems?.map((item, index) => ({
                ...item,
                idx: index + 1,
            })),
        [routeData],
    );

    const columns = useMemo(
        () => [
            // {Header: '', accessor: 'idx'},
            {Header: t('models'), accessor: 'bus_model_name'},
            {Header: t('rasxod'), accessor: 'diff', Cell: EditableCell},
            // {Header: t('coef'), accessor: 'coefficient'},
        ],
        [t, routeData],
    );

    const handleSubmit = () => {
        handleSave.mutate({
            item_list: routeData.diffNormItems.map((elem) => ({
                bus_model_id: elem.bus_model_id,
                diff: elem.diff,
                id: elem.id,
            })),
            route_id: routeData.route_id,
        });
    };

    return {
        data,
        columns,
        handleSubmit,
        handleSave,
    };
};
