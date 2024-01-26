import { IDevice, useGetMonitoringDevicesQuery } from "@/entities/device"

import { DeviceMarker } from "./ui"

export const MonitorDevices = () => {
	const { data } = useGetMonitoringDevicesQuery({ enabled: false })

	return (
		<>
			{data?.list.map((device: IDevice) => (
				<DeviceMarker key={device?.id} device={device} />
			))}
		</>
	)
}
