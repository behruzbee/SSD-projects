import cx from "clsx"
import { FC } from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import { FullscreenControl } from "react-leaflet-fullscreen"

import { mapDefaultCenter, mapDefaultZoom } from "../model/constants"
import s from "./styles.module.scss"
import { ILeafletMap } from "./types"

export const LeafletMap: FC<ILeafletMap> = ({
	children,
	className,
	center,
	preferCanvas,
	zoom,
	position = "topright",
}) => {
	return (
		<MapContainer
			className={cx(s.leafletMap, className)}
			center={center ?? mapDefaultCenter}
			zoom={zoom ?? mapDefaultZoom}
			preferCanvas={preferCanvas ?? true}
			attributionControl={false}
		>
			<LayersControl position={position}>
				<LayersControl.BaseLayer name="2GIS" checked>
					<TileLayer url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}" />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="OSM">
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Google">
					<TileLayer
						url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
						attribution="Google Maps"
					/>
				</LayersControl.BaseLayer>
			</LayersControl>
			<FullscreenControl position={position} />
			{children}
		</MapContainer>
	)
}
