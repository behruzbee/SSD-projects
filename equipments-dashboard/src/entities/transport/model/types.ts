export interface ITransport {
	id: number
	plate_number: string
	tracker_id: string
	transport_type_id: number
	organization_id: number
	description?: string
	garage_id?: number
	lat: null | number
	lng: null | number
	image: string
	transport_type_name: string
}
