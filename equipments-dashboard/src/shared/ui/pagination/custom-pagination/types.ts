import { PaginationProps } from "@mantine/core"
import { PropsWithChildren } from "react"

type DefaultProps = PropsWithChildren & PaginationProps
export interface IStyledPagination extends DefaultProps {
	perPage?: number
}
