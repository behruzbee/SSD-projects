import { FC } from "react"
import { EditControl, EditControlProps } from "react-leaflet-draw"

interface LeafletDrawPolygonProps extends EditControlProps {
	setCoorList: (data: any) => void
}

export const LeafletDrawPolygon: FC<LeafletDrawPolygonProps> = ({
	position,
	draw,
	setCoorList,
}) => {
	const _onCreated = (e: any) => {
		let layer = e.layer

		setCoorList(layer._latlngs[0])
	}

	const _onEdited = () => {
		// TODO: find correct wayt to Edit poylgon shape, or rewrite draw logic to match polygon feat
	}

	const _onDeleted = () => {
		setCoorList(undefined)
	}

	return (
		<EditControl
			position={position}
			onCreated={_onCreated}
			onEdited={_onEdited}
			onDeleted={_onDeleted}
			draw={{
				polygon: draw.polygon,
				circle: false,
				rectangle: false,
				marker: false,
				polyline: false,
				circlemarker: false,
			}}
		/>
	)
}
