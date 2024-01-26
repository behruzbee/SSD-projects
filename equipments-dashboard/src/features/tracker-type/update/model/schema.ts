import * as yup from "yup"

import { validationSchema } from "@/shared/libs/schema"

export const updateTrackerTypeSchema = yup.object().shape({
	name: validationSchema.trackerTypeName,
})