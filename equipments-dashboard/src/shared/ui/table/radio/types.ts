import { ColumnDef } from "@tanstack/react-table"

export interface IRadioTable
	extends React.TableHTMLAttributes<HTMLTableElement> {
	columns: ColumnDef<any>[]
	data: any
	isLoading?: boolean
}
