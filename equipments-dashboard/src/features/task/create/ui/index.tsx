import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Select, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { TaskPages } from "@/shared/constants/routes"
import { FilledButton, OutlineButton } from "@/shared/ui/buttons"

import { useCreateTaskQuery } from "../api/query"
import { createTaskSchema } from "../model/schema"
import { ICreateTaskFormData } from "../model/types"

export const CreateTaskForm = () => {
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateTaskFormData>({
		mode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			remark: "",
		},
		resolver: yupResolver(createTaskSchema),
	})

	const { mutate } = useCreateTaskQuery({
		onSuccess: () => navigate(TaskPages.Root),
	})

	const onSubmit = (data: ICreateTaskFormData) => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Select
				size="md"
				data={[
					"Поездка по маршруту",
					"Обход контрольных точек",
					"Присутствие внутри геозоны",
					"Задача по времени",
				]}
				placeholder="Тип действия"
				mb={"0.5rem"}
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
