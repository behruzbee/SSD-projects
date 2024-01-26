import {useMemo} from 'react';

import {useStationType} from '@api/station_type_list/hooks';
import {helper} from '@shared/helpers';

const {handleOption} = helper;

export const useTypeOptions = () => {
    const {stationTypeList} = useStationType();

    const typeOptions = useMemo(
        () =>
            handleOption(stationTypeList)?.map((item) => ({
                label: item.label.toUpperCase(),
                value: item.value,
            })),
        [stationTypeList],
    );

    return typeOptions;
};
