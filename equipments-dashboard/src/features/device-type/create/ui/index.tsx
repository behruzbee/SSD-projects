import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useCreateDeviceTypeQuery } from "../api/query"
import { createDeviceTypeSchema } from "../model/schema"
import { ICreateDeviceTypeFormData } from "../model/types"

export const CreateDeviceTypeForm = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateDeviceTypeFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			description: "",
		},
		resolver: yupResolver(createDeviceTypeSchema),
	})

	const { mutate } = useCreateDeviceTypeQuery({})

	const onSubmit = (data: ICreateDeviceTypeFormData) => {
		mutate({ ...data })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.name?.message}</>}>
						<Input size="md" placeholder="Имя" {...field} />
					</Input.Wrapper>
				)}
			/>

			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.description?.message}</>}>
						<Textarea size="md" placeholder="Подробнее" {...field} />
					</Input.Wrapper>
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
