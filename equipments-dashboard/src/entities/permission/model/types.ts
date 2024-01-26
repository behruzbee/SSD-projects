export interface IInitialState {
	permissions: PermissionObjType
}

export interface IPermissionStore extends IInitialState {
	changePermission: (obj: IPermissionInput) => void
	setPermissions: (obj: PermissionObjType) => void
	clearPermissions: () => void
}

interface IPermissionInput {
	name: PermissionNamesType
	value: PermissionValueType
}

export type PermissionValueType = 0 | 1 | 2 | 3

export interface IPermissionFull {
	[key: string]: {
		label: string
		route: string
	}
}

export type PermissionNamesType =
	| "organization"
	| "garage"
	| "group"
	| "tracker"
	| "tracker_type"
	| "transport"
	| "transport_type"
	| "device"
	| "device_type"
	| "point"
	| "users"
	| "roles"
	| "settings"
	| "order"
	| "permissions"
	| "reports"

export type PermissionObjType = Record<PermissionNamesType, PermissionValueType>
