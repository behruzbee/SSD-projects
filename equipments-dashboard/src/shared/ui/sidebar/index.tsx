import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const Sidebar: FC<
	PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
	return <div className={cx(s.sidebar, className)}>{children}</div>
}
