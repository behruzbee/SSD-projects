import { IOrganization } from "@/entities/organization"

export interface IOrganizationFormData
	extends Pick<IOrganization, "name" | "description"> {}
