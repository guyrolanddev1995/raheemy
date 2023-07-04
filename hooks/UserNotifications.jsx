import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axiosInstance from "../services/axios";

const UserNotifications = () => {
	const registerNotification = async () => {
		if(Device.isDevice) {
			const {status: existingStatus} = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus

			if(existingStatus !== "granted") {
				const {status} = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}

			if(finalStatus !== "granted") {
				alert("Pas de jeton de notification")
				return false
			}

			return await getNotificationToken()
		}

	}

	const getNotificationToken = async () => {
		let token = await Notifications.getExpoPushTokenAsync()

		if(!token.data) {
			return false
		}

		await savePushNotificationToken(token.data)
		return token.data
	}

	const savePushNotificationToken = async (notificationToken) => {
		const appDevice = {
			platform: Device.osName,
			platform_version: Device.osVersion,
			device_name: Device.modelName,
			app_version: Constants.manifest.version,
			ios_version: Constants.manifest.ios.buildNumber,
			android_version: Constants.manifest.android.versionCode,
			main_version: Constants.manifest.version,
			token: notificationToken
		}

		try {
			const response = await axiosInstance.post('/devices/store', appDevice)
			console.log(response.data)
		} catch (err) {
			console.log(err.response.data)
		}
	}


	return {registerNotification}
}

export default UserNotifications