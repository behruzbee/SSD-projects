import { IRole } from "@/entities/role"

export interface ICreateRoleFormData extends Omit<IRole, "id"> {}
