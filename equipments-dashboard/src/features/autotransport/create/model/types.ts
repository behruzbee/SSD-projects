import { ITransport } from "@/entities/transport"

export interface ITransportFormData
	extends Pick<
		ITransport,
		| "plate_number"
		| "tracker_id"
		| "transport_type_id"
		| "garage_id"
		| "organization_id"
		| "description"
	> {}
