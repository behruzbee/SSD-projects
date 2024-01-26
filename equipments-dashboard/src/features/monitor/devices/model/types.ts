import { ITransport } from "@/entities/transport"

export interface IInitialState {
	autotransports: ITransport[] | undefined
}

export interface ITransportsStore extends IInitialState {
	setAutotransports: (autotransports: ITransport[] | undefined) => void
}
