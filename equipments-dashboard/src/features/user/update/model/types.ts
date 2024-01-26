import { IUser } from "@/entities/user"

export interface IUpdateUserFormData extends Omit<IUser, "password" | "id"> {}
