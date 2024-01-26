import { FC, PropsWithChildren } from "react"

import s from "./style.module.scss"

export const HeaderTitle: FC<PropsWithChildren> = ({ children }) => {
	return <h2 className={s.title}>{children}</h2>
}
