import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateOrganizationSchema = yup.object().shape({
	name: validationSchema.organiztionName,
	description: validationSchema.remark,
})
