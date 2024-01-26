import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useCreateOrganizationQuery } from "../api/query"
import { createOrganizationSchema } from "../model/schema"
import s from "./styles.module.scss"
import { IOrganizationFormData } from "./types"

export const CreateOrganizationForm = () => {
	const navigate = useNavigate()
	const { mutate } = useCreateOrganizationQuery()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IOrganizationFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			description: "",
		},
		resolver: yupResolver(createOrganizationSchema),
	})

	const onSubmit = (data: IOrganizationFormData) => {
		mutate(data)
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.name?.message}</>}>
						<Input
							size="md"
							placeholder="Юридическое название организации"
							{...field}
						/>
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

			<Flex gap={8} mt={15}>
				<OutlineButton size="md" type="submit" onClick={() => navigate(-1)}>
					Отменить
				</OutlineButton>
				<FilledButton size="md" type="submit" disabled={!isValid}>
					Добавить
				</FilledButton>
			</Flex>
		</form>
	)
}
