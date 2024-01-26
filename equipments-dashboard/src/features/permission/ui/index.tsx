import { FC, PropsWithChildren } from "react"

import { useGetMeQuery } from "@/entities/auth"
import { PermissionValueType } from "@/entities/permission"
import { basePermissions } from "@/entities/permission"

import { NoAccess } from "@/shared/ui/warnings"

interface IPermissionControl {
	name: keyof typeof basePermissions
	level: Exclude<PermissionValueType, 0>
}

export const PermissionControl: FC<IPermissionControl & PropsWithChildren> = ({
	level,
	children,
	name,
}) => {
	const { data } = useGetMeQuery({ enabled: false })
	// authorized user permission
	const value: PermissionValueType = data?.permissions?.[name] || 0

	switch (level) {
		case 1:
			return value < level ? <NoAccess /> : <>{children}</>

		case 2:
			return value < level ? <></> : <>{children}</>

		case 3:
			return value < level ? <></> : <>{children}</>

		default:
			return <></>
	}
}
