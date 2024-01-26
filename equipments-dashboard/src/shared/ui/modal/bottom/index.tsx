import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const ModalBottom: FC<
	PropsWithChildren & React.HtmlHTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
	return (
		<div className={cx(s.modalBottom, className)} {...props}>
			{children}
		</div>
	)
}
