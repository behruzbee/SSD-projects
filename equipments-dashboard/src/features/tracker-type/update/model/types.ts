import { ITrackerType } from "@/entities/tracker-type"

export interface IUpdateTrackerTypeFormData
	extends Pick<ITrackerType, "name"> {}
