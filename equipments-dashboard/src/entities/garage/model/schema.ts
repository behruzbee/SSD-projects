import * as yup from "yup"

export const garageSchema = yup.object().shape({
	name: yup.string().required("необходимо имя гаража"),
	description: yup.string(),
})
