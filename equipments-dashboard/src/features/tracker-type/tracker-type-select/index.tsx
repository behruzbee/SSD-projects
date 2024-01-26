import { Select, SelectProps } from "@mantine/core"
import { FC } from "react"
import { When } from "react-if"

import { useGetTrackerTypesQuery } from "@/entities/tracker-type"

import { formatListToSelect } from "@/shared/libs/list-to-select"

export const TrackerTypesSelect: FC<Omit<SelectProps, "data">> = ({
	value,
	...props
}) => {
	const { data, isLoading } = useGetTrackerTypesQuery({ pagination: false })

	return (
		<When condition={!isLoading}>
			<Select
				size="md"
				data={formatListToSelect(data, {
					label: "name",
					value: "id",
				})}
				placeholder="Тип трекера"
				defaultValue={value}
				{...props}
			/>
		</When>
	)
}
