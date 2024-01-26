import { IUser } from "@/entities/user"

export interface ICreateUserFormData
	extends Omit<IUser, "id" | "role_id" | "imei"> {}
