import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createUserSchema = yup.object().shape({
	last_name: validationSchema.last_name,
	login: validationSchema.login,
	email: validationSchema.email,
	first_name: validationSchema.first_name,
	phone_number: validationSchema.phone_number,
	password: validationSchema.password,
	remark: validationSchema.remark,
})
