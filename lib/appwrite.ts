import { CreateUserParams, SignInParams } from "@/type"
import { Account, Avatars, Client, ID, Query, TablesDB } from "react-native-appwrite"

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,	
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: 'com.jsm.foodordering',
	projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!
}

export const client = new Client()

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const database = new TablesDB(client)
const avatars = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserParams) => {
	try {
		const newAccount = await account.create({ 
			userId: ID.unique(),
			email,
			password,
			name
		})

		if(!newAccount) throw Error

		await signIn({ email, password })

		const avatarUrl = await avatars.getInitialsURL(name)

		const newUser = await database.createRow({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.userCollectionId,
			rowId: ID.unique(),
			data: {
				accountId: newAccount.$id,
				email,
				name,
				avatar: avatarUrl
			}
		})

		return newUser
	} catch (error) {
		throw new Error(error as string)
	}
}

export const signIn = async ({ email, password }: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession({ email, password })
	} catch (error) {
		throw new Error(error as string)
	}
}

export const currentUser = async() => {
	try {
		const currentAccount = await account.get()
		if(!currentAccount) throw Error

		const currentUser = await database.listRows({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.userCollectionId,
			queries: [
				Query.equal('accountId', currentAccount.$id)
			]
		})

		if(!currentUser) throw Error

		return currentUser.rows[0]
	} catch (error) {
		throw new Error(error as string)
	}
}