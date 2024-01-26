type InputType = { label: string; value: string }

export const formatListToSelect = (
	list: any,
	{ label, value }: InputType,
): Array<{ label: string; value: string }> => {
	const formattedList = list?.map((item: any) => ({
		label: item[label]?.toString(),
		value: item[value]?.toString(),
	}))
	return formattedList ?? []
}
