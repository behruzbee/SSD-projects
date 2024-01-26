import L from "leaflet"
import "leaflet.markercluster"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { useMonitorStagesStore } from "@/features/monitor/stages"

import { mapDefaultCenter, mapDefaultZoom } from "@/entities/leaflet-map"

import GarageIcon from "@/shared/assets/images/garage.svg"

import { statuses } from "./constants"
import { calcCoordinateCenter } from "./lib/calc-coordinate-center"
import { IInitialState, IMonitoringMapStore } from "./types"

const initialState: IInitialState = {
	map: null,
	garages: undefined,
	selectedTransportId: undefined,
	statuses,
}

const garagesLayer = new L.FeatureGroup()
const polygonLayer = new L.FeatureGroup()

export const useMonitoringMapStore = create<IMonitoringMapStore>()(
	devtools((set, get) => ({
		...initialState,
		setMap: (map) => {
			set({ map })
		},
		setGarages: (garages) => {
			set({ garages })
		},
		drawGarages: () => {
			const garages = get().garages
			const map = get().map

			if (map) {
				garages?.forEach((garage) => {
					const coorList: any = garage.coorList?.map((coor) => [
						coor.lat,
						coor.lng,
					])

					const coorCenter = calcCoordinateCenter(coorList)

					if (coorCenter && coorList) {
						const [lat, lng] = coorCenter

						L.marker([lat, lng], {
							icon: L.icon({ iconUrl: GarageIcon }),
						})
							.bindTooltip(garage.name)
							.openTooltip()
							.addTo(garagesLayer)
							.addEventListener("click", () => {
								// change monitor-sidebar state
								useMonitorStagesStore
									.getState()
									.changeMonitorStage({ name: "garage", object: garage })

								// clear map
								get().clearMapLayers()

								// draw garage polygon

								L.polygon([coorList], { color: "#4455EA" }).addTo(polygonLayer)
								map.addLayer(polygonLayer)
							})
					}
				})
				map.addLayer(garagesLayer)
			}
		},
		drawGarage: (garage) => {
			const map = get().map
			if (map) {
				get().clearMapLayers()

				const coorList: any = garage.coorList?.map((coor) => [
					coor.lat,
					coor.lng,
				])

				const coorCenter = calcCoordinateCenter(coorList)

				L.polygon([coorList], { color: "#4455EA" }).addTo(polygonLayer)
				map.addLayer(polygonLayer)
				map.flyTo(coorCenter, map.getZoom() * 1.1)
			}
		},
		selectTransport: (transport) => {
			const map = get().map
			if (map && transport) {
				map.flyTo([transport.lng || 0, transport.lat || 0])
				set({ selectedTransportId: transport.id })
			}
		},
		drawAll: () => {
			polygonLayer.clearLayers()
			get().drawGarages()
			get().map?.flyTo(mapDefaultCenter, mapDefaultZoom)
		},
		clearMapLayers: () => {
			garagesLayer.clearLayers()
			polygonLayer.clearLayers()
		},
	})),
)
