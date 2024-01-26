import * as yup from "yup"

export const autotransportSchema = yup.object().shape({
	plate_number: yup.string().required("необходим тип транспорта"),
	tracker_id: yup.string().required("необходим трекер транспорта"),
	transport_type_id: yup.number().required("необходим тип транспорта"),
	organization_id: yup.number().required("необходимо добавить организацию"),
	garage_id: yup.number(),
	description: yup.string(),
})
