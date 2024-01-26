import { IGarage } from "@/entities/garage"
import { IStatusStage } from "@/entities/status"

export interface IInitialState {
	monitorStage: monitorStage
}

export interface IMonitorStages extends IInitialState {
	changeMonitorStage: (stage: monitorStage) => void
}

interface monitorStage {
	name: MonitorStagesType
	object?: IGarage
	statusStage?: IStatusStage
}

export type MonitorStagesType = "all" | "status" | "garage" | "autotransports"
