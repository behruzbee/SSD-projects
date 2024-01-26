import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

import { TOKEN } from "@/shared/constants/env.ts"
import { AppPages } from "@/shared/constants/routes.ts"

export const useLogout = () => {
	const navigate = useNavigate()

	return () => {
		Cookies.remove(TOKEN.AUTH_TOKEN)
		navigate(AppPages.LoginPage)
	}
}
