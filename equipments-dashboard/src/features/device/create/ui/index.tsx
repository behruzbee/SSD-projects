import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { DeviceTypesSelect } from "@/features/device-type/device-type-select"
import { OrganizationSelect } from "@/features/organization"
import { TrackerSelect } from "@/features/tracker"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useCreateDeviceQuery } from "../api/query"
import { createDeviceSchema } from "../model/schema"
import { ICreateDeviceFormData } from "../model/types"

export const CreateDeviceForm = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateDeviceFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			device_type_id: "",
			phone_number: "",
			organization_id: "",
			tracker_id: "",
			description: "",
		},
		resolver: yupResolver(createDeviceSchema),
	})

	const { mutate } = useCreateDeviceQuery({})

	const onSubmit = (data: ICreateDeviceFormData) => {
		mutate({ ...data })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.name?.message}</>}>
						<Input size="md" placeholder="Название" {...field} />
					</Input.Wrapper>
				)}
			/>

			<Controller
				control={control}
				name="phone_number"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.device_type_id?.message}</>}>
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

			<Flex gap={8}>
				<OutlineButton
					mt={15}
					size="md"
					type="submit"
					onClick={() => navigate(-1)}
				>
					Отменить
				</OutlineButton>

				<FilledButton mt={15} size="md" type="submit" disabled={!isValid}>
					Добавить
				</FilledButton>
			</Flex>
		</form>
	)
}
