import { create } from "zustand"

import { ICRUDModalStore, IInitialState } from "./types"

const initialState: IInitialState = {
	isOpenCreateModal: false,
	isOpenReadModal: false,
	isOpenUpdateModal: false,
	isOpenDeleteModal: false,
	id: undefined,
}

const CRUDModalStoreInstance = create<ICRUDModalStore>()((set) => ({
	...initialState,
	openCreateModal: () => {
		set({ isOpenCreateModal: true })
	},
	closeCreateModal: () => {
		set({ isOpenCreateModal: false })
	},
	openReadModal: (id) => {
		set({ id })
		set({ isOpenReadModal: true })
	},
	closeReadModal: () => {
		set({ isOpenReadModal: false })
	},
	openUpdateModal: (id) => {
		set({ id })
		set({ isOpenUpdateModal: true })
	},
	closeUpdateModal: () => {
		set({ isOpenUpdateModal: false })
	},
	openDeleteModal: (id) => {
		set({ id })
		set({ isOpenDeleteModal: true })
	},
	closeDeleteModal: () => {
		set({ isOpenDeleteModal: false })
	},
}))

export const CRUDModalStoreGenerator = () => CRUDModalStoreInstance
