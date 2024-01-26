import create, {SetState} from 'zustand';

import {IEmployeePositions} from '@models/employee_positions';

interface IEmployeePosition {
    employeePositions: IEmployeePositions[];
    setEmployeePositions: (payload: IEmployeePositions[]) => void;
}

export const useEmployeePositionsStore = create<IEmployeePosition>(
    (set: SetState<IEmployeePosition>) => ({
        employeePositions: [],
        setEmployeePositions: (payload): void => {
            set({employeePositions: payload});
        },
    }),
);
