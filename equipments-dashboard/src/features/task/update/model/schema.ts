import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateUserSchema = yup.object().shape({
	remark: validationSchema.remark,
})
