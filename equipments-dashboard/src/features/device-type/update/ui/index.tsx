import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { useGetDeviceTypeQuery } from "@/entities/device-type/api/query"

import { FilledButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { useUpdateDeviceTypeQuery } from "../api/query"
import { updateDeviceTypeSchema } from "../model/schema"
import { IUpdateDeviceTypeFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateDeviceTypeForm = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetDeviceTypeQuery(Number(id))
	const { mutate, isLoading: isUpdating } = useUpdateDeviceTypeQuery({})

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateDeviceTypeFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateDeviceTypeSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				name: data?.name,
				description: data?.description,
			})
	}, [data, reset])

	const onSubmit = (data: IUpdateDeviceTypeFormData) => {
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

				<FilledButton
					loading={isUpdating}
					mt={15}
					size="md"
					type="submit"
					disabled={!isValid}
				>
					Добавить
				</FilledButton>
			</form>
		</LoaderWrapper>
	)
}
