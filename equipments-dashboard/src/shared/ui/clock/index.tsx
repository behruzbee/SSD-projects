import cx from "clsx"
import { FC, useEffect, useState } from "react"

import s from "./styles.module.scss"

export const Clock: FC<React.ParamHTMLAttributes<HTMLParagraphElement>> = ({
	className,
}) => {
	const [date, setDate] = useState(new Date())

	function refreshClock() {
		setDate(new Date())
	}

	useEffect(() => {
		const timerId = setInterval(refreshClock, 1000)

		return function cleanup() {
			clearInterval(timerId)
		}
	}, [])

	return <p className={cx(className, s.time)}>{date.toLocaleTimeString()}</p>
}
