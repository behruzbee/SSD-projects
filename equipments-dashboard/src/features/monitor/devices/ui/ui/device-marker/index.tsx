import L from "leaflet"
import LeafletDriftMarker from "leaflet-drift-marker"
import { FC, useRef } from "react"
import { renderToString } from "react-dom/server"
import { When } from "react-if"
import { Popup } from "react-leaflet"
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

import IconDevice from "@/shared/assets/images/device.svg"

import { PopupInfo } from "../popup-info"

interface IDeviceMarker {
	device: any
}

export const DeviceMarker: FC<IDeviceMarker> = ({ device }) => {
	const markerRef = useRef<LeafletDriftMarker | null>(null)

	return (
		<When condition={device.lat && device.lng}>
			<ReactLeafletDriftMarker
				key={device.id}
				position={[device.lat, device.lng]}
				ref={markerRef}
				duration={5000}
				icon={
					new L.DivIcon({
						html: renderToString(<img src={IconDevice} />),
					})
				}
				eventHandlers={{
					click: (e) => e.target.openPopup(),
				}}
			>
				<Popup closeButton={false}>
					<PopupInfo {...device} />
				</Popup>
			</ReactLeafletDriftMarker>
		</When>
	)
}
