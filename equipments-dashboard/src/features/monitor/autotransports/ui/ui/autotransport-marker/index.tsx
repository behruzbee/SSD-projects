import { Box } from "@mantine/core"
import L from "leaflet"
import LeafletDriftMarker from "leaflet-drift-marker"
import { FC, useRef } from "react"
import { renderToString } from "react-dom/server"
import { Popup } from "react-leaflet"
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

import { IMonitoringTransport } from "@/entities/monitoring"

import IconCar from "@/shared/assets/images/icon-car.svg"

import { PopupInfo } from "../popup-info"
import s from "./styles.module.scss"

interface ITransportMarker {
	transport: IMonitoringTransport
}

export const AutotransportMarker: FC<ITransportMarker> = ({ transport }) => {
	const markerRef = useRef<LeafletDriftMarker | null>(null)

	return (
		<ReactLeafletDriftMarker
			key={transport.id}
			position={[transport.lat || 0, transport.lng || 0]}
			ref={markerRef}
			duration={5000}
			icon={
				new L.DivIcon({
					html: renderToString(
						<Box className={s.icon}>
							<img src={IconCar} />
						</Box>,
					),
				})
			}
			eventHandlers={{
				click: (e) => e.target.openPopup(),
			}}
		>
			<Popup closeButton={false}>
				<PopupInfo {...transport} />
			</Popup>
		</ReactLeafletDriftMarker>
	)
}
