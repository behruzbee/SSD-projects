import { create } from "zustand"

import { useMonitoringMapStore } from "@/features/monitor/map"

import { IInitialState, IMonitorStages } from "./types"

const initialState: IInitialState = {
	monitorStage: {
		name: "all",
	},
}

export const useMonitorStagesStore = create<IMonitorStages>()((set, get) => ({
	...initialState,
	changeMonitorStage: (stage) => {
		set({ monitorStage: stage })
		switch (stage.name) {
			case "all":
				useMonitoringMapStore.getState().drawAll()
				break

			case "status":
				break

			case "garage":
				const garage = get().monitorStage.object
				garage && useMonitoringMapStore.getState().drawGarage(garage)
				break

			default:
				break
		}
	},
}))
