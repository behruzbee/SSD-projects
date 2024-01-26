import { ITrackerType } from "@/entities/tracker-type"

export interface ICreateTrackerTypeFormData
	extends Pick<ITrackerType, "name"> {}
