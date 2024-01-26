export interface IInitialState {
	isOpenCreateModal: boolean
	isOpenReadModal: boolean
	isOpenUpdateModal: boolean
	isOpenDeleteModal: boolean
	id: number | undefined
}

export interface ICRUDModalStore extends IInitialState {
	openCreateModal: (id?: number) => void
	closeCreateModal: () => void
	openReadModal: (id?: number) => void
	closeReadModal: () => void
	openUpdateModal: (id?: number) => void
	closeUpdateModal: () => void
	openDeleteModal: (id?: number) => void
	closeDeleteModal: () => void
}
