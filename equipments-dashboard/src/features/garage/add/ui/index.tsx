import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Textarea } from "@mantine/core"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FeatureGroup } from "react-leaflet"

import { LeafletDrawPolygon } from "@/features/polygon"

import { garageSchema, useGarageStore } from "@/entities/garage"
import { LeafletMap } from "@/entities/leaflet-map/ui"

import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { ModalBottom, ModalContent } from "@/shared/ui/modal"

import { useAddGarageQuery } from "../api/query"
import s from "./styles.module.scss"
import { IGarageFormData } from "./types"

export const GarageForm = () => {
	const [closeAddModal] = useGarageStore((state) => [state.closeAddModal])

	const { mutate } = useAddGarageQuery({ onSuccess: closeAddModal })

	const [coorList, setCoorList] = useState(undefined)

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<IGarageFormData>({
		mode: "onSubmit",
		shouldFocusError: true,
		defaultValues: {
			name: "",
			description: "",
		},
		resolver: yupResolver(garageSchema),
	})

	const onSubmit = (data: IGarageFormData) => {
		mutate({ ...data, coorList })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<ModalContent>
				<Controller
					control={control}
					name="name"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.name?.message}</>}>
							<Input size="md" placeholder="Название гаража" {...field} />
						</Input.Wrapper>
					)}
				/>

				<LeafletMap className={s.map}>
					<FeatureGroup>
						<LeafletDrawPolygon
							position="topleft"
							setCoorList={setCoorList}
							draw={{
								polygon: {
									shapeOptions: {
										color: "green",
										weight: 4,
									},
								},
							}}
						/>
					</FeatureGroup>
				</LeafletMap>

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
