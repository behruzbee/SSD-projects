import { FC, PropsWithChildren } from "react"

import s from "./style.module.scss"

export const Header: FC<PropsWithChildren> = ({ children }) => {
	return <div className={s.wrapper}>{children}</div>
}
