import * as yup from "yup"

export const validationSchema = {
	username: yup.string().required("необходим username"),
	password: yup.string().required("необходим пароль"),
	imei: yup.string().required("необходим имеи"),
	last_name: yup.string().required("необходима фамилия"),
	login: yup.string().required("необходим логин"),
	email: yup.string().email().required("необходима почта"),
	first_name: yup.string().required("необходимо имя"),
	phone_number: yup.string().required("необходим телефон"),
	remark: yup.string(),
	role_id: yup.number().required("необходима роль"),
	organiztionName: yup.string().required("необходима организация"),
	deviceTypeName: yup.string().required("необходим тип устройства"),
	trackerName: yup.string().required("необходим трекер"),
	trackerTypeName: yup.string().required("необходим тип трекера"),
	deviceName: yup.string().required("необходимо имя устройства"),
	roleName: yup.string().required("необходимо название"),
}
