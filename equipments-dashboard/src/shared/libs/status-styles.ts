import { StatusKeyType } from "@/entities/status"

export const statusCSS = (status?: StatusKeyType) => {
	switch (status) {
		case "active":
			return { color: "#06C270", background: "rgba(240, 68, 56, 0.2)" }
		case "inActive":
			return { color: "#FF3B3B", background: "rgba(209, 250, 223, 1)" }
		case "inRepair":
			return { color: "#475366", background: "rgba(247, 143, 8, 0.2)" }
		case "inGarage":
			return { color: "#003399", background: "rgba(159, 120, 237, 0.2)" }

		default:
			return {
				color: "transparent",
				background: "transparent",
			}
	}
}
