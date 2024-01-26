import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const TabsItem: FC<
	PropsWithChildren & React.HTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
	return (
		<div className={cx(s.tabsItem, className)} {...props}>
			{children}
		</div>
	)
}
