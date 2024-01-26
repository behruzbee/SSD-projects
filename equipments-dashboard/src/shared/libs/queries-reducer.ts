export const queriesReducer = (filters: any) => {
	return Object.entries(filters).reduce((queries, [key, value]) => {
		if (value instanceof Array) {
			const likewiseQueries = [...value].reduce(
				(str, id) => (str += `${key}=${id}&`),
				"",
			)

			return value.length > 0 ? (queries += likewiseQueries) : queries
		}

		return value !== undefined ? (queries += `${key}=${value}&`) : queries
	}, "")
}
