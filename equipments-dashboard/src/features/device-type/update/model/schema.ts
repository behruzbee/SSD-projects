import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateDeviceTypeSchema = yup.object().shape({
	name: validationSchema.deviceTypeName,
	description: validationSchema.remark,
})
