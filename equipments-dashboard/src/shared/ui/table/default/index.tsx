import { ActionIcon, Flex, Table } from "@mantine/core"
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import cx from "clsx"
import { FC } from "react"

import { ReactComponent as IconSort } from "@/shared/assets/images/table-sort.svg"

import { RocketLoader } from "../../loaders"
import { CustomPagination } from "../../pagination"
import s from "./styles.module.scss"
import { IDefaultTable } from "./types"

export const DefaultTable: FC<IDefaultTable> = ({
	columns,
	data,
	isLoading,
	total,
	per_page = 10,
	current_page,
	pagination = true,
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

	if (!total) return <div className={s.noData}>Нет данных</div>

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

											{header.id !== "actions" && (
												<ActionIcon>
													<IconSort />
												</ActionIcon>
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

			{pagination && (
				<CustomPagination
					total={total}
					value={current_page}
					perPage={per_page}
				/>
			)}
		</Flex>
	)
}
