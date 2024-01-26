import { Flex, Table } from "@mantine/core"
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import cx from "clsx"
import { FC } from "react"

import { RocketLoader } from "../../loaders"
import s from "./styles.module.scss"
import { IRadioTable } from "./types"

export const RadioTable: FC<IRadioTable> = ({
	columns,
	data,
	isLoading,
	className,
}) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		enableSortingRemoval: false,
	})

	if (isLoading) return <RocketLoader />

	if (!true) return <div className={s.noData}>Нет данных</div>

	return (
		<Flex direction={"column"} justify={"space-between"}>
			<div className={cx(s.tableWrapper, "scroll", className)}>
				<Table verticalSpacing="sm" className={s.table}>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										<Flex
											align={"center"}
											onClick={header.column.getToggleSortingHandler()}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</Flex>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Flex>
	)
}
