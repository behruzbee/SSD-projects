import {
    useEmployeeMutationD,
    useEmployeeMutationS,
} from '@api/employee_manage/mutations';
import {useModalManageStore} from '@features/edit-operation/modals-manage/model';
import {IEmployeeData} from '@models/employee_manage_model';
import {useEmployeeManageStore} from '@store/employees_manage';

export const useEmployeeOperations = () => {
    const {setModalOpen, closeAllModal} = useModalManageStore((state) => state);
    const [setSelectedEmployee, setPage] = useEmployeeManageStore((s) => [
        s.setSelectedEmployee,
        s.setPage,
    ]);
    const handleEditEmployee = (props: IEmployeeData) => {
        setSelectedEmployee(props);
        setModalOpen('add', true);
    };
    const handleDeleteEmployee = (props: IEmployeeData) => {
        setSelectedEmployee(props);
        setModalOpen('delete', true);
    };
    const handlePagination = (value: number) => {
        setPage(value);
    };

    const handleCloseModal = () => closeAllModal();
    const handleAddModal = () => setModalOpen('add', true);
    const employeeMutationD = useEmployeeMutationD(handleCloseModal);
    const saveDriver = useEmployeeMutationS(handleCloseModal);
    return {
        handleDeleteEmployee,
        handleEditEmployee,
        handlePagination,
        handleCloseModal,
        handleAddModal,
        saveDriver,
        employeeMutationD,
    };
};
