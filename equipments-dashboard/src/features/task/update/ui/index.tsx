import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useGetUserQuery } from "@/entities/user"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { useUpdateUserQuery } from "../api/query"
import { updateUserSchema } from "../model/schema"
import { IUpdateTaskFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateTaskForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data, isLoading } = useGetUserQuery(Number(id))
	const { mutate } = useUpdateUserQuery({})

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateTaskFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateUserSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				remark: data?.remark,
			})
	}, [data, reset])

	const onSubmit = (formData: IUpdateTaskFormData) => {
		mutate({ ...formData, id: Number(id) })
	}

	return (
		<LoaderWrapper isLoading={isLoading}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="remark"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.remark?.message}</>}>
							<Textarea size="md" placeholder="Подробнее" {...field} />
						</Input.Wrapper>
					)}
				/>

				<Flex gap={8}>
					<OutlineButton
						mt={15}
						size="md"
						type="submit"
						disabled={!isValid}
						onClick={() => navigate(-1)}
					>
						Отменить
					</OutlineButton>
					<FilledButton mt={15} size="md" type="submit" disabled={!isValid}>
						Сохранить
					</FilledButton>
				</Flex>
			</form>
		</LoaderWrapper>
	)
}
