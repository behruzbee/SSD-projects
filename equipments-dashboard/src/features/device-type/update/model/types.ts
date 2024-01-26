import { IDeviceType } from "@/entities/device-type"

export interface IUpdateDeviceTypeFormData extends Omit<IDeviceType, "id"> {}
