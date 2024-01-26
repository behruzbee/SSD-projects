const dateFormatOptions = {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
}

const timeFormatOptions = { hour: "2-digit", minute: "2-digit" }

export const formatDate = (date: string | undefined) => {
	if (typeof date === "undefined") {
		return ["", ""]
	}

	const inputDate = new Date(date)
	const formattedDate = inputDate.toLocaleDateString(
		"en-GB",
		dateFormatOptions as any,
	)
	const formattedTime = inputDate.toLocaleTimeString(
		"en-GB",
		timeFormatOptions as any,
	)

	return [formattedDate, formattedTime]
}
