export interface IInitialState {}

export interface IStatusStore extends IInitialState {}

export interface IStatusStage {
	type: string
	status: string
	label: string
}

export type StatusKeyType = "active" | "inActive" | "inRepair" | "inGarage"
