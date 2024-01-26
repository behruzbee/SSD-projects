export interface IInitialState {
	isOpenAddModal: boolean
}

export interface ITransportTypeStore extends IInitialState {
	openAddModal: () => void
	closeAddModal: () => void
}

export interface ITransportType {
	id: number
	name: string
	description?: string
	image?: string
}
