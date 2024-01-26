import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const ModalContent: FC<
	PropsWithChildren & React.HtmlHTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
	return (
		<div className={cx(s.modalContent, className)} {...props}>
			{children}
		</div>
	)
}
