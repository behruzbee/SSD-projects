import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateUserSchema = yup.object().shape({
	imei: validationSchema.imei,
	login: validationSchema.login,
	email: validationSchema.email,
	last_name: validationSchema.last_name,
	first_name: validationSchema.first_name,
	phone_number: validationSchema.phone_number,
	remark: validationSchema.remark,
	role_id: validationSchema.role_id,
})
