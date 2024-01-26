import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const TabsWrapper: FC<
	PropsWithChildren & React.HTMLAttributes<HTMLElement>
> = ({ children, className }) => {
	return <div className={cx(s.tabsWrapper, className)}>{children}</div>
}
