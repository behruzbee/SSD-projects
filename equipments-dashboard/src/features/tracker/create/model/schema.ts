import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const createTrackerSchema = yup.object().shape({
	name: validationSchema.trackerName,
	tracker_type_id: validationSchema.trackerTypeName,
	imei: validationSchema.imei,
})
