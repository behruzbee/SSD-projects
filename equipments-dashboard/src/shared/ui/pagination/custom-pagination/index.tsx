import { Flex, Pagination, Text } from "@mantine/core"
import cx from "clsx"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as IconPrev } from "@/shared/assets/images/icon-left-arrow.svg"
import { ReactComponent as IconNext } from "@/shared/assets/images/icon-right-arrow.svg"

import s from "./styles.module.scss"
import { IStyledPagination } from "./types"

export const CustomPagination: FC<IStyledPagination> = ({
	className,
	total,
	value,
	perPage,
	onChange,
	...props
}) => {
	const navigate = useNavigate()
	const showedCount = value! * perPage!

	return (
		<Flex align={"center"} justify={"space-between"} p={"0.5rem 0"}>
			<Text component={"p"} className={cx("text-inputs")}>
				Показано {showedCount > total ? total : showedCount} записей из {total}
			</Text>
			<Pagination
				total={Math.ceil(total / perPage!)}
				value={value}
				className={cx(s.pagination, className)}
				classNames={{
					control: s.control,
				}}
				previousIcon={IconPrev}
				nextIcon={IconNext}
				onChange={(page) => navigate(`?page=${page}`)}
				{...props}
			/>
		</Flex>
	)
}
