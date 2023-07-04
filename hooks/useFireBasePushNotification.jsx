import messaging from '@react-native-firebase/messaging';

const useFireBasePushNotification = () => {
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission()
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||  authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
            console.log("Unauthorized")
            return false
        }

        return enabled
    }

    return {requestUserPermission}
}

export default useFireBasePushNotification