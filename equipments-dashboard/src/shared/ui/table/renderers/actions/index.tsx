import { ActionIcon, Flex } from "@mantine/core"
import { FC } from "react"

import { ReactComponent as IconDelete } from "@/shared/assets/images/icon-delete.svg"
import { ReactComponent as IconEdit } from "@/shared/assets/images/icon-edit.svg"

interface Props {
	editFn: () => void
	watchFn: () => void
	hideEdit?: boolean
	hideWatch?: boolean
}

export const TableActions: FC<Props> = ({
	editFn,
	watchFn,
	hideEdit,
	hideWatch,
}) => {
	return (
		<Flex gap={"0 1rem"} justify={"flex-end"}>
			{!hideEdit && (
				<ActionIcon>
					<IconEdit onClick={editFn} />
				</ActionIcon>
			)}
			{!hideWatch && (
				<ActionIcon hidden={hideWatch}>
					<IconDelete onClick={watchFn} />
				</ActionIcon>
			)}
		</Flex>
	)
}
