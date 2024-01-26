import { Select, SelectProps } from "@mantine/core"
import { FC } from "react"
import { When } from "react-if"

import { useGetDeviceTypesQuery } from "@/entities/device-type"

import { formatListToSelect } from "@/shared/libs/list-to-select"

export const DeviceTypesSelect: FC<Omit<SelectProps, "data">> = ({
	value,
	...props
}) => {
	const { data, isLoading } = useGetDeviceTypesQuery({ pagination: false })

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
				placeholder="Тип устройства"
				value={value}
				{...props}
			/>
		</When>
	)
}
