import { ITransport } from "@/entities/transport"

export interface IMonitoringTransport
	extends Pick<ITransport, "id" | "plate_number" | "lat" | "lng"> {
	type: string
	group_name: null
	speed: null
	driver: string
	mileage: null
}
