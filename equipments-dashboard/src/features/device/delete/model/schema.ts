import * as yup from "yup"

export const deleteUserSchema = yup.object().shape({
	login: yup.string().required("необходим логин"),
	mail: yup.string().email().required("необходима почта"),
	name: yup.string().required("необходимо имя"),
	password: yup.string().required("необходимо пароль"),
	remark: yup.string().required("необходимо примечание"),
})
