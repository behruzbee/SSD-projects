import { ITracker } from "@/entities/tracker"

export interface ICreateTrackerFormData
	extends Pick<ITracker, "imei" | "tracker_type_id" | "name"> {}
