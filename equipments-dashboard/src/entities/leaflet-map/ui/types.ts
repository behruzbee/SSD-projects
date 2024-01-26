import { PropsWithChildren } from "react"
import { LayersControlProps, MapContainerProps } from "react-leaflet"

type DefaultProps = PropsWithChildren & MapContainerProps & LayersControlProps

export interface ILeafletMap extends DefaultProps {}
