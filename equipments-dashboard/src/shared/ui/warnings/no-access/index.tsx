// import { ReactComponent as IconNoAccesss } from "@/shared/assets/images/icon-no-access.svg"
import s from "./styles.module.scss"

export const NoAccess = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.layer}>
				{/* 	<div className={s.iconWrapper}>
					<IconNoAccesss />
				</div>
				<h3 className={s.title}>Нет доступа</h3> */}
				<p className={s.text}>
					Извините у вас нет доступа чтобы использовать этот модуль. Свяжитесь с
					администратором!
				</p>
			</div>
		</div>
	)
}
