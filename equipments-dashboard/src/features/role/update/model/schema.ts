import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateRoleSchema = yup.object().shape({
	name: validationSchema.login,
})
