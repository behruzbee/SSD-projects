import {
	PermissionNamesType,
	PermissionObjType,
} from "@/entities/permission/model/types"

export const formatPermissions = (permissions: PermissionObjType) => {
	return Object.keys(permissions).map((key) => ({
		value: permissions[key as PermissionNamesType],
		name: key,
	}))
}
