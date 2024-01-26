import { IOrganization } from "@/entities/organization"

export interface IUpdateOrganizationFormData
	extends Pick<IOrganization, "name" | "description"> {}
