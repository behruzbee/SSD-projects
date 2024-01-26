export const generateRandomPassword = () => {
	const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"
	const numbers = "0123456789"
	const specialSymbols = '!@#$%^&*(),.?":{}|<>'

	const allCharacters =
		uppercaseLetters + lowercaseLetters + numbers + specialSymbols

	const getRandomChar = (characters: string) =>
		characters[Math.floor(Math.random() * characters.length)]

	// Ensure at least one character from each category
	let password =
		getRandomChar(uppercaseLetters) +
		getRandomChar(lowercaseLetters) +
		getRandomChar(numbers) +
		getRandomChar(specialSymbols)

	// Fill the rest of the password with random characters
	for (let i = password.length; i < 8; i++) {
		password += getRandomChar(allCharacters)
	}

	// Shuffle the characters in the password
	const shuffledPassword = password
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("")

	return shuffledPassword
}
