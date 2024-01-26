import { create } from "zustand"

import { IInitialState, ITransportTypeStore } from "./types"

const initialState: IInitialState = {
	isOpenAddModal: false,
}

export const useTransportTypeStore = create<ITransportTypeStore>()((set) => ({
	...initialState,
	openAddModal: () => {
		set({ isOpenAddModal: true })
	},
	closeAddModal: () => {
		set({ isOpenAddModal: false })
	},
}))
