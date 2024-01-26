import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useGetTrackerTypeQuery } from "@/entities/tracker-type"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { useUpdateTrackerTypeQuery } from "../api/query"
import { updateTrackerTypeSchema } from "../model/schema"
import { IUpdateTrackerTypeFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateTrackerTypeForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading } = useGetTrackerTypeQuery(Number(id))
	const { mutate, isLoading: isUpdating } = useUpdateTrackerTypeQuery()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateTrackerTypeFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateTrackerTypeSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				name: data?.name,
			})
	}, [data, reset])

	const onSubmit = (data: IUpdateTrackerTypeFormData) => {
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

				<Flex gap={8}>
					<OutlineButton
						mt={15}
						size="md"
						type="submit"
						onClick={() => navigate(-1)}
					>
						Отменить
					</OutlineButton>
					<FilledButton
						loading={isUpdating}
						mt={15}
						size="md"
						type="submit"
						disabled={!isValid}
					>
						Добавить
					</FilledButton>
				</Flex>
			</form>
		</LoaderWrapper>
	)
}
