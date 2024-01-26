import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { TrackerTypesSelect } from "../../../tracker-type/tracker-type-select"
import { useCreateTrackerQuery } from "../api/query"
import { createTrackerSchema } from "../model/schema"
import { ICreateTrackerFormData } from "../model/types"

export const CreateTrackerForm = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateTrackerFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			tracker_type_id: "",
			imei: "",
		},
		resolver: yupResolver(createTrackerSchema),
	})

	const { mutate } = useCreateTrackerQuery()

	const onSubmit = (data: ICreateTrackerFormData) => {
		mutate({ ...data, tracker_type_id: data.tracker_type_id })
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
				name="imei"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.imei?.message}</>}>
						<Input size="md" placeholder="Имеи" {...field} />
					</Input.Wrapper>
				)}
			/>

			<Controller
				control={control}
				name="tracker_type_id"
				render={({ field }) => (
					<TrackerTypesSelect
						value={field.value?.toString()}
						onChange={field.onChange}
						error={errors.tracker_type_id?.message}
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
