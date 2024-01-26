import { Divider } from "@mantine/core"
import { FC, PropsWithChildren } from "react"

export const Normalize: FC<PropsWithChildren> = ({ children }) => {
	if (children) return <>{children}</>

	return <Divider color="#667085" w={14} />
}
