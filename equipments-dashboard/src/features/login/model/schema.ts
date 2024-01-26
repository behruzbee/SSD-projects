import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const loginScheme = yup.object().shape({
	username: validationSchema.username,
	password: validationSchema.password,
})
