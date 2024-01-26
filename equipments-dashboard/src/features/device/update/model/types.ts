import { IDevice } from "@/entities/device"

export interface IUpdateDeviceFormData extends Omit<IDevice, "id"> {}
