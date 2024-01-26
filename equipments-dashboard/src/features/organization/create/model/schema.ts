import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createOrganizationSchema = yup.object().shape({
	name: validationSchema.organiztionName,
	description: validationSchema.remark,
})
