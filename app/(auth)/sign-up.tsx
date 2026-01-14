import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

export const SignUp = () => {
	return (
		<View>
			<Text>Sign-up</Text>
			<Button title='Sign In' onPress={ () => router.push('/sign-in') }></Button>
		</View>
	)
}

export default SignUp