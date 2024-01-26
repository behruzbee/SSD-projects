import cx from "clsx"
import { FC, PropsWithChildren } from "react"

import s from "./styles.module.scss"

export const SidebarListItem: FC<
	PropsWithChildren & React.LiHTMLAttributes<HTMLLIElement>
> = ({ children, className }) => {
	return <li className={cx(s.item, className)}>{children}</li>
}
