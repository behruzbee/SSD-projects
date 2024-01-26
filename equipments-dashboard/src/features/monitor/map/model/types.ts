import { IGarage } from "@/entities/garage"
import { ITransport } from "@/entities/transport"

import { statuses } from "./constants"

export interface IInitialState {
	map: L.Map | null
	garages?: IGarage[]
	statuses: typeof statuses
	selectedTransportId: undefined | number
}

export interface IMonitoringMapStore extends IInitialState {
	setMap: (map: L.Map | null) => void
	setGarages: (garages: IGarage[] | undefined) => void
	drawGarages: () => void
	drawGarage: (garage: IGarage) => void
	selectTransport: (transports: ITransport | undefined) => void
	drawAll: () => void
	clearMapLayers: () => void
}
