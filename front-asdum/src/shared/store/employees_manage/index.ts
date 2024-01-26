import create, {SetState} from 'zustand';

import {IEmployeeData} from '@src/shared/models/employee_manage_model';

interface IEmployeeManage {
    employeeData: IEmployeeData[];
    term: string;
    totalCount: number;
    page: number;
    setEmployeeData: (payload: IEmployeeData[]) => void;
    setSearchTerm: (payload: string) => void;
    setTotalCount: (payload: number) => void;
    setPage: (payload: number) => void;
    selectedEmployee: IEmployeeData;
    setSelectedEmployee: (payload: IEmployeeData) => void;
    clearSelected: () => void;
}

export const useEmployeeManageStore = create<IEmployeeManage>(
    (set: SetState<IEmployeeManage>) => ({
        employeeData: [],
        selectedEmployee: {} as IEmployeeData,
        term: '',
        totalCount: 0,
        page: 1,
        clearSelected: () => {
            set({selectedEmployee: {} as IEmployeeData});
        },
        setSelectedEmployee: (payload) => {
            set({selectedEmployee: payload});
        },
        setEmployeeData: (payload: IEmployeeData[]): void => {
            set({employeeData: payload});
        },
        setSearchTerm: (payload: string): void => {
            set({term: payload});
        },
        setTotalCount: (payload: number): void => {
            set({totalCount: payload});
        },
        setPage: (payload: number): void => {
            set({page: payload});
        },
    }),
);

interface IEmployeeSave {
    savedData: IEmployeeData[];
    setSavedData: (payload: IEmployeeData[]) => void;
}

export const useEmployeeSaveStore = create<IEmployeeSave>(
    (set: SetState<IEmployeeSave>) => ({
        savedData: [],
        setSavedData: (payload: IEmployeeData[]) => {
            set({savedData: payload});
        },
    }),
);
