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
import {setAuth} from "../../app/features/userSlice";
import AuthHeaderAction from "../../components/AuthHeaderAction";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("0768357397")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(false)
  const dispatch = useDispatch()

  const {isAuthenticated} = useSelector(state => state.user)

  const [errors, setError] = useState({
    email: null,
    password: null
  })

  const handleSubmit = async () => {
    if (email.length === 0 ) {
      setError({...errors, email: 'Vous devez renseigner votre numéro de téléphone'})
      return
    }

    if (password.length === 0 ) {
      setError( {...errors, password: 'Vous devez renseigner votre mot de passe'})
      return
    }

    if(password.length < 6) {
      setError( {...errors, password: "Vous devez renseigner un mot de passe de 6 caractères minimum"})
      return
    }

    if(errors.email === null && errors.password === null) {
      await login()
    }
  }

  const login = async () => {
    setLoading(true)

    try {
      const response = await axiosInstance.post(`/auth/login`, {
        email,
        password,
        device_id: Platform.OS
      });

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
      const intendedRoute = await AsyncStorage.getItem("intend")


      dispatch(setAuth({
        user: response.data.data,
        token: response.data.token
      }))

      if (intendedRoute) {
        navigation.navigate(intendedRoute)
        await AsyncStorage.removeItem("intend")
      } else {
        navigation.navigate("Home")
      }

    } catch (error) {
      if (error.response && error.response.status === 422) {
        let serverErrors = error.response.data.errors;
        let updatedErrors = { ...errors };

        for (let err in serverErrors) {
          updatedErrors[err] = serverErrors[err][0];
        }

        setError(updatedErrors);
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

                <View className="justify-center pt-10 items-center">
                  <View className="w-28 h-28 rounded bg-white shadow">
                    <Image
                        source={require("../../assets/AppIcon.png")}
                        className="w-full h-full object-contain"
                    />
                  </View>
                </View>

                <View className="mt-12">
                  <View>
                    <BaseText className="text-3xl">Connexion</BaseText>
                    <BaseText className={`mt-2 ${Platform.OS == "ios" ? "text-[16px]" : ""}`}>
                      Veuillez renseigner vos paramètres de connexion
                    </BaseText>
                  </View>

                  <View className="space-y-4 mt-8">
                    <View>
                      <View className={`
                      w-full bg-white flex-row items-center h-14 rounded
                      ${errors.email ? "border-2 border-primary": ''}
                  `}>
                        <TextInput
                            value={email}
                            className={`flex-1 pl-3`}
                            placeholder="Numéro de téléphone"
                            placeholderTextColor="#9ca3af"
                            keyboardType={"number-pad"}
                            onChangeText={text => setEmail(text)}
                            onFocus={() => setError({...errors, email: null})}
                        />
                      </View>
                      {errors?.email && <BaseText className="text-sm text-primary font-semibold mt-2">{errors?.email}</BaseText>}
                    </View>

                    <View>
                      <View className={`
                        w-full bg-white flex-row  items-center h-14 rounded
                        ${errors.password ? "border-2 border-primary": ''}   
                      `}>
                        <TextInput
                            value={password}
                            className={`flex-1 pl-3`}
                            placeholder="Mot de passe"
                            placeholderTextColor="#9ca3af"
                            secureTextEntry={hidePassword}
                            onChangeText={text => setPassword(text)}
                            onFocus={() => setError({...errors, password: null})}
                        />
                        <Pressable
                            onPress={() => setHidePassword(!hidePassword)}
                            className="h-full items-center justify-center w-9"
                        >
                          <Ionicons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={22} color="black" />
                        </Pressable>
                      </View>
                      {errors?.password && <BaseText className="text-sm text-primary font-semibold mt-2">{errors?.password}</BaseText>}
                    </View>

                    <View className="flex-row justify-end">
                      <Pressable>
                        <BaseText className="text-blue-500">Mot de passe oublié ?</BaseText>
                      </Pressable>
                    </View>
                  </View>

                  <View className="mt-10">
                    <CustomButton
                        onPress={handleSubmit}
                        className="bg-primary py-3 text-center px-4 rounded"
                    >
                      <BaseText className="text-center text-white text-[18px]">Se connecter</BaseText>
                    </CustomButton>
                  </View>
                </View>

                <View className="flex-row justify-center mt-10">
                    <BaseText className="text-center text-gray-500">Vous n'avez pas de compte?</BaseText>
                    <Pressable
                      className="ml-0.5"
                      onPress={() => navigation.navigate("RegisterScreen")}
                    >
                      <BaseText className="text-center text-blue-500"> Créer un compte</BaseText>
                    </Pressable>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
  );
}

export default LoginScreen;
