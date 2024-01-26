import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Select, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { autotransportSchema } from "@/entities/transport"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import {
	useGetAllTransformedGaragesQuery,
	useGetAllTransformedTransportTypesQuery,
} from "../api/query"
import { useAddAutotransportQuery } from "../api/query"
import { ITransportFormData } from "../model/types"
import { SelectItem } from "./ui"

export const CreateAutotransportForm = () => {
	const navigate = useNavigate()
	const { mutate } = useAddAutotransportQuery({})

	const { data: allTransformedTransportTypes } =
		useGetAllTransformedTransportTypesQuery()

	const { data: allTransformedGarages } = useGetAllTransformedGaragesQuery()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ITransportFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			plate_number: "",
			tracker_id: "",
			transport_type_id: undefined,
			garage_id: undefined,
			organization_id: undefined,
		},
		resolver: yupResolver(autotransportSchema),
	})

	const onSubmit = (data: ITransportFormData) => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="organization_id"
				render={({ field }) => (
					<Select
						size="md"
						placeholder="Организация транспорта"
						data={[]}
						error={errors.transport_type_id?.message}
						errorProps={{ size: "sm" }}
						nothingFound="No options"
						itemComponent={SelectItem}
						value={field.value?.toString()}
						onChange={field.onChange}
						searchable
						mb={"0.5rem"}
					/>
				)}
			/>

			<Controller
				control={control}
				name="transport_type_id"
				render={({ field }) => (
					<Select
						size="md"
						placeholder="Тип транспорта"
						data={allTransformedTransportTypes ?? []}
						error={errors.transport_type_id?.message}
						errorProps={{ size: "sm" }}
						nothingFound="No options"
						itemComponent={SelectItem}
						value={field.value?.toString()}
						onChange={field.onChange}
						searchable
						mb={"0.5rem"}
					/>
				)}
			/>

			<Controller
				control={control}
				name="garage_id"
				render={({ field }) => (
					<Select
						size="md"
						placeholder="Гараж транспорта"
						data={allTransformedGarages ? allTransformedGarages : []}
						error={errors.transport_type_id?.message}
						errorProps={{ size: "sm" }}
						nothingFound="No options"
						itemComponent={SelectItem}
						value={field.value?.toString()}
						onChange={field.onChange}
						searchable
						mb={"0.5rem"}
					/>
				)}
			/>

			<Controller
				control={control}
				name="plate_number"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.plate_number?.message}</>}>
						<Input size="md" placeholder="Гос. номер транспорта" {...field} />
					</Input.Wrapper>
				)}
			/>

			<Controller
				control={control}
				name="tracker_id"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.tracker_id?.message}</>}>
						<Input size="md" placeholder="Трекер id" {...field} />
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
