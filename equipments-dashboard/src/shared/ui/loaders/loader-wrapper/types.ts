import { PropsWithChildren } from "react"

import { IRocketLoader } from "@/shared/ui/loaders/rocket/types"

type DefaultProps = PropsWithChildren & IRocketLoader

export interface ILoaderWrapper extends DefaultProps {
	isLoading: boolean
}
