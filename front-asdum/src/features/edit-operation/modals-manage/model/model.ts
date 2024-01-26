export type TypeProps = 'edit' | 'add' | 'delete' | 'sidebar';

export interface IModalManage {
    editModalOpen: boolean;
    addModalOpen: boolean;
    deleteModalOpen: boolean;
    sidebarOpen: boolean;
    setModalOpen: (type: TypeProps, value: boolean) => void;
    closeAllModal: () => void;
}
