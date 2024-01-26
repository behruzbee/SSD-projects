import { ActionIcon, Flex } from "@mantine/core"
import { FC } from "react"

import { ReactComponent as IconTrash } from "@/shared/assets/images/icon-trash.svg"
import { ReactComponent as IconUpdate } from "@/shared/assets/images/icon-update.svg"

interface Props {
	updateFn?: () => void
	deleteFn?: () => void
	hideUpdate?: boolean
	hideDelete?: boolean
}

export const ActionRenderer: FC<Props> = ({
	updateFn,
	deleteFn,
	hideUpdate,
	hideDelete,
}) => {
	return (
		<Flex gap={"0 1rem"} justify={"flex-end"} mr={"1rem"}>
			{!hideUpdate && (
				<ActionIcon>
					<IconUpdate onClick={updateFn} />
				</ActionIcon>
			)}
			{!hideDelete && (
				<ActionIcon>
					<IconTrash onClick={deleteFn} />
				</ActionIcon>
			)}
		</Flex>
	)
}
