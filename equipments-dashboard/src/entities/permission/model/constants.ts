import { IPermissionFull, PermissionObjType } from "./types"

export const permissionsFull: IPermissionFull = {
	organization: { label: "Организация", route: "organization" },
	garage: { label: "Гараж", route: "garage" },
	group: { label: "Группа", route: "group" },
	tracker: { label: "Трекера", route: "tracker" },
	tracker_type: { label: "Тип трекера", route: "tracker_type" },
	transport: { label: "Транспорт", route: "transport" },
	transport_type: { label: "Тип транспорта", route: "transport_type" },
	device: { label: "Девайс", route: "device" },
	device_type: { label: "Тип девайса", route: "device_type" },
	point: { label: "Контрольные точки", route: "point" },
	users: { label: "Пользователи", route: "users" },
	roles: { label: "Роли", route: "roles" },
	settings: { label: "Настройки", route: "settings" },
	order: { label: "Задача", route: "order" },
	permissions: { label: "Доступы", route: "permissions" },
	reports: { label: "Отчеты", route: "reports" },
}

export const basePermissions: PermissionObjType = {
	organization: 0,
	garage: 0,
	group: 0,
	tracker: 0,
	tracker_type: 0,
	transport: 0,
	transport_type: 0,
	device: 0,
	device_type: 0,
	point: 0,
	users: 0,
	roles: 0,
	settings: 0,
	order: 0,
	permissions: 0,
	reports: 0,
}
