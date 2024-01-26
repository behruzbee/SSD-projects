import { ActionIcon } from "@mantine/core"
import { FC } from "react"

import { ReactComponent as IconGeneration } from "@/shared/assets/images/icon-generation.svg"

import styles from "./styles.module.scss"

export const PasswordGenratorIcon: FC<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
	return (
		<ActionIcon className={styles.generation} {...props}>
			<IconGeneration />
		</ActionIcon>
	)
}
