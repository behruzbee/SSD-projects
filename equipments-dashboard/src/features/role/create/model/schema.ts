import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createRoleSchema = yup.object().shape({
	name: validationSchema.roleName,
	remark: validationSchema.remark,
})
