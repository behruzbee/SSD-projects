import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useCreateTrackerTypeQuery } from "../api/query"
import { createTrackerTypeSchema } from "../model/schema"
import { ICreateTrackerTypeFormData } from "../model/types"

export const CreateTrackerTypeForm = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateTrackerTypeFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
		},
		resolver: yupResolver(createTrackerTypeSchema),
	})

	const { mutate } = useCreateTrackerTypeQuery({})

	const onSubmit = (data: ICreateTrackerTypeFormData) => {
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
