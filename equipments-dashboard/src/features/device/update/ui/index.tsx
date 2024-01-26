import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { DeviceTypesSelect } from "@/features/device-type"
import { OrganizationSelect } from "@/features/organization"
import { TrackerSelect } from "@/features/tracker"

import { useGetDeviceQuery } from "@/entities/device/api/query"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useUpdateDeviceQuery } from "../api/query"
import { updateDeviceSchema } from "../model/schema"
import { IUpdateDeviceFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateDeviceForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data } = useGetDeviceQuery(Number(id))
	const { mutate } = useUpdateDeviceQuery({})

	const {
		control,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isValid },
	} = useForm<IUpdateDeviceFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateDeviceSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				name: data?.name,
				phone_number: data?.phone_number,
				device_type_id: data?.device_type_id,
				organization_id: data?.organization_id,
				tracker_id: data?.tracker_id,
				description: data?.description,
			})
	}, [data, reset])

	console.log(getValues())

	const onSubmit = (data: IUpdateDeviceFormData) => {
		mutate({ ...data, id: Number(id) })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.name?.message}</>}>
						<Input size="md" placeholder="Имя девайса" {...field} />
					</Input.Wrapper>
				)}
			/>
			<Controller
				control={control}
				name="phone_number"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.phone_number?.message}</>}>
						<Input size="md" placeholder="Телефон" {...field} />
					</Input.Wrapper>
				)}
			/>

			<Controller
				control={control}
				name="device_type_id"
				render={({ field }) => (
					<DeviceTypesSelect
						mb=".3rem"
						value={field.value?.toString()}
						onChange={field.onChange}
						error={errors.device_type_id?.message}
					/>
				)}
			/>

			<Controller
				control={control}
				name="organization_id"
				render={({ field }) => (
					<OrganizationSelect
						mb=".3rem"
						value={field.value?.toString()}
						onChange={field.onChange}
						error={errors.device_type_id?.message}
					/>
				)}
			/>

			<Controller
				control={control}
				name="tracker_id"
				render={({ field }) => (
					<TrackerSelect
						mb=".3rem"
						value={field.value?.toString()}
						onChange={field.onChange}
						error={errors.tracker_id?.message}
					/>
				)}
			/>

			<Flex gap={8} mt={15}>
				<OutlineButton size="md" type="submit" onClick={() => navigate(-1)}>
					Отменить
				</OutlineButton>

				<FilledButton size="md" type="submit" disabled={!isValid}>
					Сохранить
				</FilledButton>
			</Flex>
		</form>
	)
}
