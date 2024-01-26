import { IRole } from "@/entities/role"

export interface IUpdateRoleFormData extends Omit<IRole, "id"> {}
