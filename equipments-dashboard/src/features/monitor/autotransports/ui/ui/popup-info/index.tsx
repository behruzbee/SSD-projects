import {
	/* Avatar, */
	Flex,
	Text,
} from "@mantine/core"
import { FC } from "react"

import { IMonitoringTransport } from "@/entities/monitoring"

export const PopupInfo: FC<IMonitoringTransport> = (transport) => {
	return (
		<Flex gap={20}>
			{/* <Avatar
				src={transport.image}
				alt={transport.transport_type_name}
				size="lg"
			/> */}
			<Flex direction="column">
				{/* <Text fw={700} tt="uppercase">
					{transport.transport_type_name}
				</Text> */}
				<Text fw={700}>{transport.plate_number}</Text>
			</Flex>
		</Flex>
	)
}
