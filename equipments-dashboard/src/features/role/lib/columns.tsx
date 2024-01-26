import { Center, Radio, Text } from "@mantine/core"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

import {
	permissionsFull,
	PermissionValueType,
	usePermissionStore,
} from "@/entities/permission"

import s from "./styles.module.scss"

const columnHelper = createColumnHelper<any>()

export const useColumns = () => {
	const [changePermission] = usePermissionStore((state) => [
		state.changePermission,
	])

	const columns: ColumnDef<any, any>[] = [
		columnHelper.accessor("name", {
			id: "label_name",
			header: () => (
				<Text h="100%" fw={700}>
					Раздел
				</Text>
			),
			cell: (props) => (
				<Text fw={500}>{permissionsFull[props.getValue()].label}</Text>
			),
		}),
		columnHelper.accessor("value", {
			id: "no_access",
			header: () => {
				return <Text className={s.text}>Без доступа</Text>
			},
			cell: (props) => {
				const name = props.row.original.name
				const value: PermissionValueType = 0

				return (
					<Center>
						<Radio
							checked={props.getValue() === value}
							onChange={() => changePermission({ name, value })}
						/>
					</Center>
				)
			},
		}),
		columnHelper.accessor("value", {
			id: "read",
			header: () => <Text className={s.text}>Только просмотр</Text>,
			cell: (props) => {
				const name = props.row.original.name
				const value: PermissionValueType = 1

				return (
					<Center>
						<Radio
							checked={props.getValue() === value}
							onChange={() => changePermission({ name, value })}
						/>
					</Center>
				)
			},
		}),
		columnHelper.accessor("value", {
			id: "update",
			header: () => <Text className={s.text}>Редактировать</Text>,
			cell: (props) => {
				const name = props.row.original.name
				const value: PermissionValueType = 2

				return (
					<Center>
						<Radio
							checked={props.getValue() === value}
							onChange={() => changePermission({ name, value })}
						/>
					</Center>
				)
			},
		}),
		columnHelper.accessor("value", {
			id: "all",
			header: () => <Text className={s.text}>Полный доступ</Text>,
			cell: (props) => {
				const name = props.row.original.name
				const value: PermissionValueType = 3

				return (
					<Center>
						<Radio
							checked={props.getValue() === value}
							onChange={() => changePermission({ name, value })}
						/>
					</Center>
				)
			},
		}),
	]

	return columns
}
