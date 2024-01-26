import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const ModalTitle: FC<
	PropsWithChildren & React.HtmlHTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
	return (
		<span className={cx(s.modalTitle, className)} {...props}>
			{children}
		</span>
	)
}
