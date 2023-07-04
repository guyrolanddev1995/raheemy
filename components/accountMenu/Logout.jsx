import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import CustomButton from "../CustomButton";
import BaseText from "../BaseText";
import axiosInstance from "../../services/axios";
import {useDispatch} from "react-redux";
import {showMessage} from "react-native-flash-message";
import {useNavigation} from "@react-navigation/native";
import useClearAuthUser from "../../hooks/useClearAuthUser";

const Logout = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {clearAuthUserInfos}  = useClearAuthUser()

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.delete("/auth/logout");
            await clearAuthUserInfos();

            showMessage({
                message: "Vous avez été déconnecté avec succès",
                type: "success",
            });
        } catch (_error) {
            console.log(_error.response);
            if (_error.response && _error.response.status === 401) {
                await clearAuthUserInfos();

                showMessage({
                    message: "Votre session a expirée veuillez vous connecter à nouveau",
                    type: "danger",
                });

                navigation.navigate("Login");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <View className="w-full justify-center flex-row mt-10">
            <CustomButton
                onPress={logout}
                className="bg-red-50 px-3 py-3 rounded-full"
            >
                <BaseText className="text-[16px] font-[700] text-primary uppercase text-left">Se deconnecter</BaseText>
            </CustomButton>
        </View>
    );
}

export default React.memo(Logout);
