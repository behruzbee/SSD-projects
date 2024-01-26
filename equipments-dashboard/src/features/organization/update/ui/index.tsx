import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useGetOrganizationQuery } from "@/entities/organization"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { useUpdateOrganizationQuery } from "../api/query"
import { updateOrganizationSchema } from "../model/schema"
import { IUpdateOrganizationFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateOrganizationForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data, isLoading } = useGetOrganizationQuery(Number(id))
	const { mutate } = useUpdateOrganizationQuery()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateOrganizationFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateOrganizationSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				name: data.name,
				description: data.description,
			})
	}, [data, reset])

	const onSubmit = (data: IUpdateOrganizationFormData) => {
		mutate({ ...data, id: Number(id) })
	}

	return (
		<LoaderWrapper isLoading={isLoading}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="name"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.name?.message}</>}>
							<Input size="md" placeholder="Имя трекера" {...field} />
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
		</LoaderWrapper>
	)
}
