import { Avatar, Group } from "@mantine/core"
import { forwardRef } from "react"

export interface ISelectItem {
	label: string
	image: string
	value: string
}

export const SelectItem = forwardRef<HTMLDivElement, ISelectItem>(
	({ label, image, value, ...others }: Partial<ISelectItem>, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap>
				{image && <Avatar src={image} />}

				<div>{label}</div>
			</Group>
		</div>
	),
)
