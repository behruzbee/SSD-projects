import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useGetTrackerQuery } from "@/entities/tracker/api/query"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"

import { TrackerTypesSelect } from "../../../tracker-type/tracker-type-select"
import { useUpdateTrackerQuery } from "../api/query"
import { updateTrackerSchema } from "../model/schema"
import { IUpdateTrackerFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateTrackerForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data, isLoading } = useGetTrackerQuery(Number(id))
	const { mutate } = useUpdateTrackerQuery()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateTrackerFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateTrackerSchema),
	})

	useEffect(() => {
		if (data)
			reset({
				name: data.name,
				tracker_type_id: data.tracker_type_id,
				imei: data.imei,
			})
	}, [data, reset])

	const onSubmit = (data: IUpdateTrackerFormData) => {
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

				<Flex gap={8} mt={15}>
					<OutlineButton size="md" type="submit" onClick={() => navigate(-1)}>
						Отменить
					</OutlineButton>
					<FilledButton size="md" type="submit" disabled={!isValid}>
						Сохранить
					</FilledButton>
				</Flex>
			</form>
		</LoaderWrapper>
	)
}
