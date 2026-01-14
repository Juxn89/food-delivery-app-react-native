import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function SignIn() {
	return (
		<View>
			<Text>Sign-in</Text>
			<Button title='Sign Un' onPress={ () => router.push('/sign-up') }></Button>
		</View>
	)
}