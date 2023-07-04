import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {removeAuth} from "../app/features/userSlice";

const useClearAuthUser = () => {
    const dispatch = useDispatch()

    const clearAuthUserInfos = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        dispatch(removeAuth());
    };

    return {clearAuthUserInfos}
}

export default useClearAuthUser;