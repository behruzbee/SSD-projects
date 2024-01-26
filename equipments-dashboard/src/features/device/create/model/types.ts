import { IDevice } from "@/entities/device"

export interface ICreateDeviceFormData extends Omit<IDevice, "id"> {}
