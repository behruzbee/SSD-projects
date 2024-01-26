import { Flex, Text } from "@mantine/core"
import { FC } from "react"

export const PopupInfo: FC<any> = (device) => {
	return (
		<Flex gap={20}>
			<Flex direction="column">
				<Text fw={700} tt="uppercase">
					{device.name}
				</Text>
				<Text fw={700}>{device.imei}</Text>
			</Flex>
		</Flex>
	)
}
