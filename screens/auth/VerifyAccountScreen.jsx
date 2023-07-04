import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import BaseText from "../../components/BaseText";
import CustomButton from "../../components/CustomButton";
import axiosInstance from "../../services/axios";
import ModalLoading from "../../components/ModalLoading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/Input";
import * as Device from "expo-device";
import {setAuth} from "../../app/features/userSlice";
import {showMessage} from "react-native-flash-message";
import AuthHeaderAction from "../../components/AuthHeaderAction";

const VerifyAccountScreen = ({navigation}) => {
    const [state, setState] = useState({
        code_validation: '',
        password: '',
        telephone: '',
        device_id: '',
    })

    const [loading, setLoading] = useState(false)
    const [inputErrors, setInputErrors] = useState({})
    const {isAuthenticated} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem("token_verify")

        try {
            const response = await axiosInstance.post(
                `/auth/account/email/confirm?token=${token}`,
                state
            );

            console.log(response.data)

            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
            const intendedRoute = await AsyncStorage.getItem("intend")

            dispatch(setAuth({
                user: response.data.data,
                token: response.data.token
            }))

            await removeAccountInfos()

            showMessage({
                message: "Votre compte a été vérifié avec succès",
                type: "success",
            });

            if (intendedRoute) {
                navigation.navigate(intendedRoute)
                await AsyncStorage.removeItem("intend")
            } else {
                navigation.navigate("Home")
            }

        } catch (error) {
            if (error.response && error.response.status === 422) {
                let serverErrors = error.response.data.errors;
                let updatedErrors = { ...inputErrors };

                for (let err in serverErrors) {
                    updatedErrors[err] = serverErrors[err][0];
                }

                setInputErrors(updatedErrors);
            }

            if(error.response && error.response.status === 403) {
                showMessage({
                    message: "Votre session a expiré",
                    type: "danger",
                });

                navigation.navigate("Login")
            }

            if(error.response && error.response.status === 500) {
                showMessage({
                    message: error.response.data.message,
                    type: "danger",
                });
            }
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    const partialsNumber = () => {
        let hideNum = [];

        for(let i = 0; i < state.telephone?.length; i++){
            if(i < state.telephone?.length - 2 ){
                hideNum.push("*");
            }else{
                hideNum.push(state.telephone[i]);
            }
        }
        return hideNum.join("");
    }

    const getAccountInfos = async () => {
        const telephone = await AsyncStorage.getItem("telephone")
        const password = await AsyncStorage.getItem("password")
        const device = Device.modelName

        setState({...state, password: password, device: device, telephone: telephone})
    }

    const removeAccountInfos = async () => {
        await AsyncStorage.removeItem("telephone")
        await AsyncStorage.removeItem("password")
        await AsyncStorage.removeItem("token_verify")
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigation.navigate("Home")
            return
        }

        getAccountInfos()

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    return (
        <>
            {loading && <ModalLoading/> }

            <SafeAreaView
                className="flex-1"
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex: 1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            className="px-4 justify-center"
                            style={{paddingTop: StatusBar.currentHeight}}
                        >
                            <AuthHeaderAction/>
                            <View className="justify-center pt-10 items-center">
                                <View className="w-28 h-28 rounded bg-white shadow">
                                    <Image
                                        source={require("../../assets/AppIcon.png")}
                                        className="w-full h-full object-contain"
                                    />
                                </View>
                            </View>

                            <View className="mt-16">
                                <View>
                                    <BaseText className="text-xl">Nous avons envoyé un code de vérification à votre numéro de téléphone</BaseText>

                                    <BaseText className={`mt-4 ${Platform.OS == "ios" ? "text-[17px]" : ""}`}>
                                        Saisissez le code de vérification à 6 chiffres envoyé {partialsNumber()}
                                    </BaseText>
                                </View>

                                <View className="space-y-4 mt-8">
                                    <View className="w-full">
                                        <Input
                                            value={state.code_validation}
                                            handleFocus={() => setInputErrors({...inputErrors, code: null})}
                                            handleChange={text => setState({...state, code_validation: text})}
                                            placeholder="******"
                                            keyboardType='number-pad'
                                            showLabel={false}
                                            showBorder={false}
                                            error={inputErrors.code}
                                            maxLength={6}
                                        />
                                    </View>
                                </View>

                                <View className="mt-5">
                                    <CustomButton
                                        onPress={handleSubmit}
                                        className="bg-primary py-3 text-center px-4 rounded"
                                    >
                                        <BaseText className="text-center text-white text-[18px]">Soumettre</BaseText>
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

export default VerifyAccountScreen;
