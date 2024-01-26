import { ITracker } from "@/entities/tracker"

export interface IUpdateTrackerFormData
	extends Pick<ITracker, "name" | "imei" | "tracker_type_id"> {}
