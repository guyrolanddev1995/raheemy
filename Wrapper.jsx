import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStackNavigator from "./routes/MainStackNavigator";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setAuth} from "./app/features/userSlice";
const Wrapper = () => {
    const {isAuthenticated} = useSelector(state => state.user)
    const dispatch = useDispatch()


    const checkIfIsAuthenticated = useMemo(async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const user = JSON.parse(await AsyncStorage.getItem("user"));

            if (token && user) {
                dispatch(setAuth({ user, token }));
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        checkIfIsAuthenticated
    }, [])

    return (
       <NavigationContainer>
           <MainStackNavigator isAuthenticated={isAuthenticated}/>
       </NavigationContainer>
    )
}

export default Wrapper