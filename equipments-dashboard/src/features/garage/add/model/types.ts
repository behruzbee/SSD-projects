export interface IInitialState {
	isOpenModal: boolean
}

export interface IGarageStore extends IInitialState {
	openModal: (isOpen: boolean) => void
}
