import { Coordinate } from "@/entities/leaflet-map"

export interface IInitialState {
	isOpenAddModal: boolean
}

export interface IGarageStore extends IInitialState {
	openAddModal: () => void
	closeAddModal: () => void
}

export interface IGarage {
	id: number
	name: string
	coorList?: Coordinate[]
	description?: string
}
