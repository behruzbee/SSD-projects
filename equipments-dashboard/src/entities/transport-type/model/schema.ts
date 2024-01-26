import * as yup from "yup"

export const transportTypeSchema = yup.object().shape({
	name: yup.string().required("необходим тип транспорта"),
	image: yup.string(),
	description: yup.string(),
})
