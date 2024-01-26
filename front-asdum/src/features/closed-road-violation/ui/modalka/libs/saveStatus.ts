import {useViolationRoadStore} from '@features/closed-road-violation/model/closed-road-violation.store';
import {
    useDelayStatusS,
    useStatusRaceS,
} from '@features/closed-road/closed-road-table/api/mutations';

export const saveStatus = (type: 'violation' | 'delay') => {
    const reset = useViolationRoadStore((s) => s.resetStatus);
    const saveViolation = useStatusRaceS(reset);
    const saveDelay = useDelayStatusS(reset);

    if (type === 'violation') {
        return saveViolation;
    } else {
        return saveDelay;
    }
};
