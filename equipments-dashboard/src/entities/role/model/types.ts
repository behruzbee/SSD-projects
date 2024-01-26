import { PermissionObjType } from "@/entities/permission"

export interface IRole {
	id: number
	name: string
	remark?: string
	permissions?: PermissionObjType
}
