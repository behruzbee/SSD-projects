import { create } from "zustand"

import { IInitialState, ITransportsStore } from "./types"

const initialState: IInitialState = {
	autotransports: undefined,
}

export const useMonitoringAutotransportsStore = create<ITransportsStore>()(
	(set) => ({
		...initialState,
		setAutotransports: (autotransports) => {
			set({ autotransports })
		},
	}),
)
