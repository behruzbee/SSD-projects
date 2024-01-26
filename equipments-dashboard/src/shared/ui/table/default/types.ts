import { ColumnDef } from "@tanstack/react-table"

export interface IDefaultTable
	extends React.TableHTMLAttributes<HTMLTableElement> {
	columns: ColumnDef<any>[]
	data: any
	per_page?: number
	total: number
	current_page: number
	isLoading?: boolean
	pagination?: boolean
}
