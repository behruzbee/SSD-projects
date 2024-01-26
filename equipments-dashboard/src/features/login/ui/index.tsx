import { yupResolver } from "@hookform/resolvers/yup"
import { Flex, Input, PasswordInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { AppPages } from "@/shared/constants/routes.ts"
import { FilledButton } from "@/shared/ui/buttons"

import { ILoginType } from "../api/libs.ts"
import { useLoginQuery } from "../api/query.ts"
import { loginScheme } from "../model/schema.ts"

export const LoginForm = () => {
	const navigate = useNavigate()
	const { mutate, isLoading } = useLoginQuery(() =>
		navigate(AppPages.MonitoringPage),
	)

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<ILoginType>({
		mode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: yupResolver(loginScheme),
	})

	const onSubmit = (data: ILoginType) => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction={"column"} gap={"0.5rem"}>
				<Controller
					control={control}
					name="username"
					render={({ field }) => (
						<Input.Wrapper
							label={"Логин"}
							error={<>{errors.username?.message}</>}
						>
							<Input size="md" placeholder={"username"} {...field} />
						</Input.Wrapper>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({ field }) => (
						<Input.Wrapper
							label={"Пароль"}
							error={<>{errors.password?.message}</>}
						>
							<PasswordInput size="md" placeholder={"******"} {...field} />
						</Input.Wrapper>
					)}
				/>
			</Flex>

			<FilledButton
				loading={isLoading}
				disabled={!isValid}
				type={"submit"}
				mt={"1.5rem"}
				size="md"
				fullWidth
			>
				Войти
			</FilledButton>
		</form>
	)
}
