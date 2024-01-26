import { FC } from "react"
import { Else, If, Then } from "react-if"

import { RocketLoader } from ".."
import { ILoaderWrapper } from "./types"

export const LoaderWrapper: FC<ILoaderWrapper> = ({
	isLoading,
	children,
	...props
}) => {
	return (
		<>
			<If condition={isLoading}>
				<Then>
					<RocketLoader {...props} />
				</Then>
				<Else>{children}</Else>
			</If>
		</>
	)
}
