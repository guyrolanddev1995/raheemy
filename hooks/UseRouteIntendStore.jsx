import AsyncStorage from "@react-native-async-storage/async-storage";

export const UseRouteIntendStore = () => {
	/**
	 * Cette fonction met en cache la route à laquelle veut accéder
	 * l'utilisateur lorsque ce dernier n'est pas connecté
	 *
	 * @param url
	 * @returns {Promise<boolean>}
	 */
	const storeIntendedRoute = async (url) => {
		try {
			await AsyncStorage.setItem("intend", url);
			return true
		}  catch (e) {
			return false
		}
	}

	/**
	 * Renvoie la route mise en cache pour une redirection
	 * vers cette derniere
	 *
	 * @returns {Promise<string>}
	 */
	const getIntendedRoute = async () => {
		return await AsyncStorage.getItem("intend")
	}

	return {
		storeIntendedRoute,
		getIntendedRoute
	}
}

export default UseRouteIntendStore