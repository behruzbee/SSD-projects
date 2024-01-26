import { useGetMonitoringTransportsQuery } from "@/entities/monitoring"

import { AutotransportMarker } from "./ui"

export const MonitorAutotransports = () => {
	const { data } = useGetMonitoringTransportsQuery({ size: 100 })

	return (
		<>
			{data?.map((transport) => (
				<AutotransportMarker
					key={transport?.plate_number}
					transport={transport as any}
				/>
			))}
		</>
	)
}
