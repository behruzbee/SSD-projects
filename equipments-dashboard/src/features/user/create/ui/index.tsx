import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { UserPages } from "@/shared/constants/routes"
import { generateRandomPassword } from "@/shared/libs/randomPasswordGenerator"
import { FilledButton, OutlineButton } from "@/shared/ui/buttons"
import { PasswordGenratorIcon } from "@/shared/ui/password-generator"

import { useCreateUserQuery } from "../api/query"
import { createUserSchema } from "../model/schema"
import { ICreateUserFormData } from "../model/types"

export const CreateUserForm = () => {
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ICreateUserFormData>({
		mode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			last_name: "",
			login: "",
			email: "",
			first_name: "",
			phone_number: "",
			password: generateRandomPassword(),
			remark: "",
		},
		resolver: yupResolver(createUserSchema),
	})

	const { mutate } = useCreateUserQuery({
		onSuccess: () => navigate(UserPages.Root),
	})

	const onSubmit = (data: ICreateUserFormData) => {
		mutate({ ...data, imei: "", role_id: 0 })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				name="last_name"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.last_name?.message}</>}>
						<Input size="md" placeholder="Фамилия" {...field} />
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
				name="phone_number"
				render={({ field }) => (
					<Input.Wrapper error={<>{errors.phone_number?.message}</>}>
						<Input size="md" placeholder="Телефон" {...field} />
					</Input.Wrapper>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field }) => (
					<Flex gap={6}>
						<Input.Wrapper w="100%" error={<>{errors.password?.message}</>}>
							<Input size="md" placeholder="Пароль" {...field} />
						</Input.Wrapper>

						<PasswordGenratorIcon
							onClick={() => {
								field.onChange(generateRandomPassword())
							}}
						/>
					</Flex>
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
