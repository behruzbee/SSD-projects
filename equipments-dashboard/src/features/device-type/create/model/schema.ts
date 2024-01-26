import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createDeviceTypeSchema = yup.object().shape({
	name: validationSchema.deviceTypeName,
})
