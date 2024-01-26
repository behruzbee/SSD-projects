import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Input, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { useSearchDeviceQuery } from "@/entities/device/api/query"
import { useGetUserQuery } from "@/entities/user"

import { formatListToSelect } from "@/shared/libs/list-to-select"
import { FilledButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { useUpdateUserQuery } from "../api/query"
import { updateUserSchema } from "../model/schema"
import { IUpdateUserFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateUserForm = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetUserQuery(Number(id))
	const { mutate } = useUpdateUserQuery({})

	const {
		control,
		handleSubmit,
		reset,
		getValues,
		watch,
		formState: { errors, isValid },
	} = useForm<IUpdateUserFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateUserSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				imei: data?.imei,
				login: data?.login,
				email: data?.email,
				first_name: data?.first_name,
				remark: data?.remark,
				last_name: data?.last_name,
				phone_number: data?.phone_number,
				role_id: data?.role_id,
			})
	}, [data, reset])

	const onSubmit = (formData: IUpdateUserFormData) => {
		mutate({ ...formData, id: Number(id) })
	}

	watch(["imei"])
	const { data: imeiData } = useSearchDeviceQuery(getValues("imei"))

	return (
		<LoaderWrapper isLoading={isLoading}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="imei"
					render={({ field }) => (
						<Autocomplete
							size="md"
							data={
								formatListToSelect(imeiData, {
									label: "imei",
									value: "imei",
								}) ?? []
							}
							placeholder="Тип устройства"
							mb={"calc(0.625rem / 2)"}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name="login"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.login?.message}</>}>
							<Input size="md" placeholder="Логин" {...field} />
						</Input.Wrapper>
					)}
				/>
				<Controller
					control={control}
					name="email"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.email?.message}</>}>
							<Input size="md" placeholder="Почта" {...field} />
						</Input.Wrapper>
					)}
				/>
				<Controller
					control={control}
					name="first_name"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.first_name?.message}</>}>
							<Input size="md" placeholder="Имя" {...field} />
						</Input.Wrapper>
					)}
				/>
				<Controller
					control={control}
					name="last_name"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.last_name?.message}</>}>
							<Input size="md" placeholder="Фамилия" {...field} />
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
					name="remark"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.remark?.message}</>}>
							<Textarea size="md" placeholder="Подробнее" {...field} />
						</Input.Wrapper>
					)}
				/>

				<FilledButton mt={15} size="md" type="submit" disabled={!isValid}>
					Сохранить
				</FilledButton>
			</form>
		</LoaderWrapper>
	)
}
