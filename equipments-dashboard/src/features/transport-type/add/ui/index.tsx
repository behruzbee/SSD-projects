import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"

import { transportTypeSchema } from "@/entities/transport-type"
import { useTransportTypeStore } from "@/entities/transport-type/model"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { ModalBottom, ModalContent } from "@/shared/ui/modal"

import { useAddTransportTypeQuery } from "../api/query"
import s from "./styles.module.scss"
import { ITransportTypeFormData } from "./types"

export const TransportTypeForm = () => {
	const [closeAddModal] = useTransportTypeStore((state) => [
		state.closeAddModal,
	])
	const { mutate } = useAddTransportTypeQuery({ onSuccess: closeAddModal })

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<ITransportTypeFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			image: "",
			description: "",
		},
		resolver: yupResolver(transportTypeSchema),
	})

	const onSubmit = (data: ITransportTypeFormData) => {
		mutate(data)
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<ModalContent>
				<Controller
					control={control}
					name="name"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.name?.message}</>}>
							<Input
								size="md"
								placeholder="Название модели транспорта"
								{...field}
							/>
						</Input.Wrapper>
					)}
				/>

				<Controller
					control={control}
					name="image"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.image?.message}</>}>
							<Input
								size="md"
								placeholder="URL транспортного средства"
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
			</ModalContent>

			<ModalBottom>
				<OutlineButton onClick={closeAddModal} size="md">
					Отменить
				</OutlineButton>
				<FilledButton size="md" type="submit" disabled={!isDirty}>
					Добавить
				</FilledButton>
			</ModalBottom>
		</form>
	)
}
