import { Card, Flex, Group, Text } from "@mantine/core"
import { FC, ReactNode } from "react"

interface CardProps {
	children: ReactNode
}

export const CardHeader: FC<CardProps> = ({ children }) => {
	return (
		<Flex gap={10} justify="space-between">
			{children}
		</Flex>
	)
}

export const StatisticsCardSection: FC<CardProps> = ({ children }) => {
	return (
		<Card.Section withBorder inheritPadding py="xs">
			<Group position="apart">
				<Text fw={500}>{children}</Text>
			</Group>
		</Card.Section>
	)
}
