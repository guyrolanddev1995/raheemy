import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView, StatusBar,
    Text,
    TextInput,
    View
} from 'react-native';
import BaseText from "../../components/BaseText";
import CustomButton from "../../components/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import axiosInstance from "../../services/axios";
import ModalLoading from "../../components/ModalLoading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/Input";
import AuthHeaderAction from "../../components/AuthHeaderAction";

const RegisterScreen = ({navigation}) => {
    const [user, setUser] = useState({
        nom: '',
        email: '',
        telephone: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)
    const [inputErrors, setInputErrors] = useState({})
    const [hidePassword, setHidePassword] = useState(true)
    const dispatch = useDispatch()

    const {isAuthenticated} = useSelector(state => state.user)

    const handleSubmit = async () => {
       await register()
    }

    const register = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.post(`/auth/register`, user);

            await AsyncStorage.setItem('telephone', response.data.data.telephone);
            await AsyncStorage.setItem('token_verify', response.data.data.token);
            await AsyncStorage.setItem('password', user.password);

            const intendedRoute = await AsyncStorage.getItem("intended")
            navigation.navigate("VerifyAccount")

            console.log(response.data)

        } catch (error) {
            if (error.response && error.response.status === 422) {
                let serverErrors = error.response.data.errors;
                let updatedErrors = { ...inputErrors };

                for (let err in serverErrors) {
                    updatedErrors[err] = serverErrors[err][0];
                }

                setInputErrors(updatedErrors);
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigation.goBack()
            return
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    return (
        <>
            {loading && <ModalLoading/> }

            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex: 1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            className="px-4 justify-center relative"
                            style={{paddingTop: StatusBar.currentHeight}}
                        >
                            <AuthHeaderAction/>

                            <View className="justify-center mt-10 items-center">
                                <View className="w-28 h-28 rounded bg-white shadow">
                                    <Image
                                        source={require("../../assets/AppIcon.png")}
                                        className="w-full h-full object-contain"
                                    />
                                </View>
                            </View>

                            <View className="mt-16">
                                <View>
                                    <BaseText className="text-3xl">Inscription</BaseText>
                                    <BaseText className={`mt-2 ${Platform.OS == "ios" ? "text-[16px]" : ""}`}>
                                        Créer votre compte utilisateur
                                    </BaseText>
                                </View>

                                <View className="space-y-4 mt-8">
                                    <View className="w-full">
                                        <Input
                                            value={user.nom}
                                            handleFocus={() => setInputErrors({...inputErrors, nom: null})}
                                            handleChange={text => setUser({...user, nom: text})}
                                            placeholder="Nom Complet"
                                            keyboardType='default'
                                            showLabel={false}
                                            showBorder={false}
                                            error={inputErrors.nom}
                                        />
                                    </View>
                                    <View className="w-full">
                                        <Input
                                            value={user.telephone}
                                            handleFocus={() => setInputErrors({...inputErrors, telephone: null})}
                                            handleChange={text => setUser({...user, telephone: text})}
                                            placeholder="Numéro de téléphone"
                                            keyboardType='phone-pad'
                                            showLabel={false}
                                            showBorder={false}
                                            error={inputErrors.telephone}
                                        />
                                    </View>
                                    <View className="w-full">
                                        <Input
                                            value={user.email}
                                            handleFocus={() => setInputErrors({...inputErrors, email: null})}
                                            handleChange={text => setUser({...user, email: text})}
                                            placeholder="Adresse email"
                                            keyboardType='email-address'
                                            showLabel={false}
                                            showBorder={false}
                                            error={inputErrors.email}
                                        />
                                    </View>

                                    <View>
                                        <View className={`
                                            w-full bg-white flex-row  items-center h-14 rounded
                                            ${inputErrors.password ? "border-2 border-primary": ''}   
                                        `}>
                                            <TextInput
                                                value={user.password}
                                                className={`flex-1 pl-3`}
                                                placeholder="Mot de passe"
                                                placeholderTextColor="#9ca3af"
                                                secureTextEntry={hidePassword}
                                                onChangeText={text => setUser({...user, password: text})}
                                                onFocus={() => setInputErrors({...inputErrors, password: null})}
                                            />
                                            <Pressable
                                                onPress={() => setHidePassword(!hidePassword)}
                                                className="h-full items-center justify-center w-9"
                                            >
                                                <Ionicons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={22} color="black" />
                                            </Pressable>
                                        </View>
                                        {inputErrors?.password && <BaseText className="text-sm text-primary font-semibold mt-2">{inputErrors?.password}</BaseText>}
                                    </View>
                                </View>

                                <View className="mt-5">
                                    <CustomButton
                                        onPress={handleSubmit}
                                        className="bg-primary py-3 text-center px-4 rounded"
                                    >
                                        <BaseText className="text-center text-white text-[18px]">S'inscrire</BaseText>
                                    </CustomButton>
                                </View>

                                <View className="flex-row justify-center mt-10">
                                    <BaseText className="text-center text-gray-500">Vous possédez un compte ?</BaseText>
                                    <Pressable
                                        className="ml-0.5"
                                        onPress={() => navigation.navigate("Login")}
                                    >
                                        <BaseText className="text-center text-blue-500"> Identifiez-vous</BaseText>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

        </>
    );
}

export default RegisterScreen;
