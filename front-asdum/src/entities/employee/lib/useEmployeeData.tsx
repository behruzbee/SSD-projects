import shallow from 'zustand/shallow';

import {useEmployeeManageStore} from '@store/employees_manage';
import {useEmployeeColumn} from '@views/manage/employees/Components/EmployeeTable/useColumns';

export const useDriverData = () => {
    const {
        employeeData,
        totalCount,
        page,
        term,
        setSearchTerm,
        selectedEmployee,
    } = useEmployeeManageStore((state) => state, shallow);
    const {columns} = useEmployeeColumn();
    return {
        employeeData,
        columns,
        totalCount,
        page,
        term,
        setSearchTerm,
        selectedEmployee,
    };
};
