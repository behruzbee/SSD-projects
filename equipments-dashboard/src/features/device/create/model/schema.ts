import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createDeviceSchema = yup.object().shape({
	name: validationSchema.deviceName,
	device_type_id: validationSchema.deviceTypeName,
	phone_number: validationSchema.phone_number,
	organization_id: validationSchema.organiztionName,
	tracker_id: validationSchema.trackerName,
	description: validationSchema.remark,
})
