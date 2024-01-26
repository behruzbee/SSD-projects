import {ICommonStatusClass, StatusClass} from '@models/status-types';

export const calculateBusCount = (
    statusData: StatusClass | null,
): ICommonStatusClass => {
    if (statusData) {
        const {
            inline,
            ingarage,
            inactiveexit,
            inactivegarage,
            inrepair,
            notinlineexit,
            offroute,
        } = statusData;
        const calculated: ICommonStatusClass = {
            inline,
            ingarage,
            inrepair,
            notactive: inactiveexit + inactivegarage,
            notinline: notinlineexit + offroute,
        };

        return calculated;
    }

    return {ingarage: 0, inline: 0, inrepair: 0, notactive: 0, notinline: 0};
};
