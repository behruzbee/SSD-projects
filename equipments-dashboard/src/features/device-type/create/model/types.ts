import { IDeviceType } from "@/entities/device-type"

export interface ICreateDeviceTypeFormData extends Omit<IDeviceType, "id"> {}
