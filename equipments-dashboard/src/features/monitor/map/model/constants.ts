import { StatusKeyType } from "@/entities/status"

import { ReactComponent as DeviceIcon } from "@/shared/assets/images/device.svg"
import { ReactComponent as TransportIcon } from "@/shared/assets/images/transport.svg"

type A = { name: StatusKeyType; label: string }[]

const commonStatuses: A = [
	{ name: "active", label: "активные" },
	{ name: "inActive", label: "не активные" },
	{ name: "inRepair", label: "в ремонте" },
]

const transportStatueses: A = [
	...commonStatuses,
	{ name: "inGarage", label: "в гараже" },
]

const deviceStatueses = [...commonStatuses]

export const statuses = [
	{
		name: "transports",
		label: "Транспорты",
		statusList: transportStatueses,
		Icon: TransportIcon,
	},
	{
		name: "devices",
		label: "Устройства",
		statusList: deviceStatueses,
		Icon: DeviceIcon,
	},
]
