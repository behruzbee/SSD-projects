import { create } from "zustand"

import { IGarageStore, IInitialState } from "./types"

const initialState: IInitialState = {
	isOpenAddModal: false,
}

export const useGarageStore = create<IGarageStore>()((set) => ({
	...initialState,
	openAddModal: () => {
		set({ isOpenAddModal: true })
	},
	closeAddModal: () => {
		set({ isOpenAddModal: false })
	},
}))
