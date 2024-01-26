import { useLocation } from "react-router-dom"

export const useQueryParams = () => {
	const { search } = useLocation()
	const regex = /[?&]([^=]+)=([^&]*)/g
	const params: { [key: string]: string } = {}
	let match

	while ((match = regex.exec(search)) !== null) {
		params[match[1]] = match[2]
	}

	return params
}
