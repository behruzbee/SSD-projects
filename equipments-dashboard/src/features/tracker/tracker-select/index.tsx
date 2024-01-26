import { Select, SelectProps } from "@mantine/core"
import { FC } from "react"
import { When } from "react-if"

import { useGetTrackersQuery } from "@/entities/tracker"

import { formatListToSelect } from "@/shared/libs/list-to-select"

export const TrackerSelect: FC<Omit<SelectProps, "data">> = ({
	value,
	...props
}) => {
	const { data, isLoading } = useGetTrackersQuery({ pagination: false })
	return (
		<When condition={!isLoading}>
			<Select
				size="md"
				data={
					formatListToSelect(data, {
						label: "name",
						value: "id",
					}) ?? []
				}
				value={value}
				placeholder="Трекер"
				{...props}
			/>
		</When>
	)
}
