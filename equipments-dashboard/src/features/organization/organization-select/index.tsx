import { Select, SelectProps } from "@mantine/core"
import { FC } from "react"
import { When } from "react-if"

import { useGetOrganizationsQuery } from "@/entities/organization"

import { formatListToSelect } from "@/shared/libs/list-to-select"

export const OrganizationSelect: FC<Omit<SelectProps, "data">> = ({
	value,
	...props
}) => {
	const { data, isLoading } = useGetOrganizationsQuery({ pagination: false })

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
				placeholder="Организация"
				value={value}
				{...props}
			/>
		</When>
	)
}
