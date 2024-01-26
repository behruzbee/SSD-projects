import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Textarea } from "@mantine/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { usePermissionStore } from "@/entities/permission"
import { useGetRoleQuery } from "@/entities/role"

import { FilledButton } from "@/shared/ui/buttons"
import { LoaderWrapper } from "@/shared/ui/loaders"
import { RadioTable } from "@/shared/ui/table/radio"

import { formatPermissions } from "../.."
import { useColumns } from "../../lib/columns"
import { useUpdateRoleQuery } from "../api/query"
import { updateRoleSchema } from "../model/schema"
import { IUpdateRoleFormData } from "../model/types"
import s from "./styles.module.scss"

export const UpdateRoleForm = () => {
	const [permissions, setPermissions, clearPermissions] = usePermissionStore(
		(state) => [
			state.permissions,
			state.setPermissions,
			state.clearPermissions,
		],
	)

	const { id } = useParams()
	const { data, isLoading } = useGetRoleQuery(Number(id))
	const { mutate } = useUpdateRoleQuery({})

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IUpdateRoleFormData>({
		mode: "onChange",
		shouldFocusError: true,
		resolver: yupResolver(updateRoleSchema),
	})

	useEffect(() => {
		if (data) {
			reset({
				name: data?.name,
				remark: data?.remark,
			})

			data.permissions && setPermissions(data.permissions)
		}

		return () => clearPermissions()
	}, [data, reset, setPermissions, clearPermissions])

	const onSubmit = (formData: IUpdateRoleFormData) => {
		mutate({ ...formData, permissions, id: Number(id) })
	}

	const columns = useColumns()

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
					name="remark"
					render={({ field }) => (
						<Input.Wrapper error={<>{errors.remark?.message}</>}>
							<Textarea size="md" placeholder="Подробнее" {...field} />
						</Input.Wrapper>
					)}
				/>

				<RadioTable columns={columns} data={formatPermissions(permissions)} />

				<FilledButton mt={15} size="md" type="submit" disabled={!isValid}>
					Сохранить
				</FilledButton>
			</form>
		</LoaderWrapper>
	)
}
