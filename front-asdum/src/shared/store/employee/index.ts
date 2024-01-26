import create, {SetState} from 'zustand';

import {EmployeeModel} from '@src/shared/models/employees_model';

interface IEmployee {
    employees: EmployeeModel[];
    setEmployees: (payload: EmployeeModel[]) => void;
}

export const useEmployeeStore = create<IEmployee>(
    (set: SetState<IEmployee>) => ({
        employees: [],
        setEmployees: (payload): void => {
            set({employees: payload});
        },
    }),
);
