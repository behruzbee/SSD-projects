export const calcCoordinateCenter = (
	coorList: Array<[number, number]> | null,
): [number, number] => {
	if (!coorList) {
		return [0, 0]
	}

	const coorSum = coorList.reduce(
		(acc: [number, number], coor: any) =>
			(acc = [acc[0] + coor[0], acc[1] + coor[1]]),
		[0, 0],
	)

	const coorCenter: [number, number] = [
		coorSum[0] / coorList.length,
		coorSum[1] / coorList.length,
	]

	return coorCenter
}
