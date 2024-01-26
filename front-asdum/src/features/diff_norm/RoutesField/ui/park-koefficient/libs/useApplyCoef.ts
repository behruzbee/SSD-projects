import shallow from 'zustand/shallow';

import {useApplyCoefficient, useDenyCoef} from '@api/diff_norm/mutations';
import {timeParser} from '@shared/helpers/timeParser';
import {useDiffNormStore} from '@shared/store/race_fuel';

export const useApplyCoef = () => {
    const [date, selectedPark, selectedOption, reset] = useDiffNormStore(
        (s) => [s.coefDateRange, s.selectedPark, s.selectedKoefOption, s.reset],
        shallow,
    );
    const denyCoef = useDenyCoef(() => {
        reset();
    });
    const applyCoefS = useApplyCoefficient();

    const handleDeny = () => {
        denyCoef.mutate({
            park_id: selectedPark.park_id,
            coef_id: selectedOption.value,
        });
    };

    const handleApplyCoef = () => {
        applyCoefS.mutate({
            coef_id: selectedOption.value,
            from_time: timeParser(date?.from, 'YYYY-MM-DD'),
            park_id: selectedPark.park_id,
            to_time: timeParser(date?.to, 'YYYY-MM-DD'),
        });
    };

    return {
        handleDeny,
        handleApplyCoef,
        denyCoef,
        applyCoefS,
    };
};
