import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from "react-redux";
import axiosInstance from "../../../services/axios";
import Input from "../../../components/Input";
import BaseText from "../../../components/BaseText";
import CustomButton from "../../../components/CustomButton";
import {showMessage} from "react-native-flash-message";
import useRouteIntendStore from "../../../hooks/UseRouteIntendStore";
import useClearAuthUser from "../../../hooks/useClearAuthUser";
import {fetchDelivryAddress} from "../../../app/features/delivryAddressSlice";
import ModalLoading from "../../../components/ModalLoading";

const DelivryAddressForm = ({navigation, user, route}) => {
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        nom: user?.nom ?? '',
        phone1: user?.telephone ?? '',
        phone2: '',
        adresse: '',
        ville: '',
        commune: ''
    })

    const [loading, setLoading] = useState(false)
    const [inputErrors, setInputErrors] = useState({})
    const [villes, setVilles] = useState([])
    const [communes, setCommunes] = useState([])

    const {storeIntendedRoute} = useRouteIntendStore()
    const {clearAuthUserInfos} = useClearAuthUser()

    const handleVilleChange = async (value, index) => {
        await fetchCommunes(value)

        setAddress((prevAddress) => ({
            ...prevAddress,
            ville: value
        }));
    }

    const addAddress = async () => {

        setLoading(true)

        try {
            const response = await axiosInstance.post(`/delivry-adresses/add`, address);

            dispatch(fetchDelivryAddress({navigation}))

            showMessage({
                message: "Adresse ajoutée avec succès",
                type: "success",
            });

            navigation.goBack()

        } catch (error) {
            if (error.response) {
                if(error.response.status === 422) {
                    let serverErrors = error.response.data.errors;
                    const newErrors = { ...inputErrors };

                    for (let errorKey in serverErrors) {
                        newErrors[errorKey] = serverErrors[errorKey][0];
                    }

                    setInputErrors(newErrors);

                    return false
                }

                if (error.response.status === 401) {
                    await storeIntendedRoute(route)
                    await clearAuthUserInfos()
                    showMessage({
                        message: "Votre session a expirée; Veuillez vous conencter",
                        type: "error",
                    });

                    navigation.navigate("Login")
                }
            }
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCommunes = async (villeId) => {
       try {
           const communeResponse = await axiosInstance.get(`/villes/${villeId}/communes`);
           setCommunes(communeResponse.data);

           if(communeResponse.data.length > 0) {
               let firstCommune = communeResponse.data[0]
               setAddress({...address, commune: firstCommune.id})
           }

           // console.log(communes)
       } catch (e) {
            console.log(e.response.data);
       }
    }

    useEffect(() => {
        const fetchVille = async () => {
            try {
                const villeResponse = await axiosInstance.get(`/villes/all?paginator&order=asc`);
                setVilles(villeResponse.data);
                let firstItem = villeResponse.data[0]

                if(firstItem) {
                    const communeResponse = await axiosInstance.get(`/villes/${firstItem.id}/communes`);
                    setCommunes(communeResponse.data);

                    let firstCommune = communeResponse.data[0]


                    setAddress({...address, ville: firstItem.id, commune: firstCommune.id})
                }

            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchVille()
    }, [])

    return (
        <>
            {loading && <ModalLoading/>}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex: 1}}>
                <ScrollView
                    className="px-2 pb-20"
                >
                    <View className="mt-2 space-y-5 p-3 pb-10 bg-white rounded">
                        <View className="w-full">
                            <Input
                                value={address.nom}
                                handleFocus={() => setInputErrors({...inputErrors, nom: null})}
                                handleChange={text => setAddress({...address, nom: text})}
                                placeholder="jean"
                                keyboardType='default'
                                label="Nom Complet"
                                showLabel={true}
                                showBorder={true}
                                error={inputErrors.nom}
                            />
                        </View>

                        <View className="w-full">
                            <Input
                                value={address.phone1}
                                handleFocus={() => setInputErrors({...inputErrors, phone1: null})}
                                handleChange={text => setAddress({...address, phone1: text})}
                                placeholder="ex: 0707070707"
                                keyboardType='phone-pad'
                                label="Numéro de téléphone"
                                showLabel={true}
                                showBorder={true}
                                error={inputErrors.phone1}
                            />
                        </View>

                        <View className="w-full">
                            <Input
                                value={address.phone2}
                                handleFocus={() => setInputErrors({...inputErrors, phone2: null})}
                                handleChange={text => setAddress({...address, phone2: text})}
                                placeholder="ex: 0707070707"
                                keyboardType='phone-pad'
                                label="Numéro de téléphone supplémentaire"
                                showLabel={true}
                                showBorder={true}
                                error={inputErrors.phone2}
                            />
                        </View>
                    </View>

                    <View className="mt-2 space-y-5 p-3 bg-white rounded">
                        <View>
                            <BaseText className="mb-2 font-[700]">Votre ville</BaseText>
                            <View className={`
                        ${Platform.OS === "android" ? "border rounded border-gray-400": ''}
                    `}>
                                <Picker
                                    style={Platform.OS === "android" ? {height: 48}: {height: "auto"}}
                                    selectedValue={address.ville}
                                    onValueChange={handleVilleChange}
                                >
                                    {villes.map((ville) => <Picker.Item key={ville.id} label={ville.nom} value={ville.id} />)}
                                </Picker>
                            </View>
                            {inputErrors.ville && <BaseText className="mt-1.5 text-[13px] text-primary">{inputErrors.ville}</BaseText>}
                        </View>

                        <View>
                            <BaseText className="mb-2 font-[700]">Votre commune</BaseText>
                            <View className={`
                        ${Platform.OS === "android" ? "border rounded border-gray-400": ''}
                    `} >
                                <Picker
                                    style={Platform.OS === "android" ? {height: 48}: {height: "auto"}}
                                    selectedValue={address.commune}
                                    onValueChange={(itemValue, itemIndex) => setAddress({...address, commune: itemValue})}
                                >
                                    {communes.map((commune) => <Picker.Item key={commune.id} label={commune.nom} value={commune.id} />)}
                                </Picker>
                            </View>
                            {inputErrors.commune && <BaseText className="mt-1.5 text-[13px] text-primary">{inputErrors.commune}</BaseText>}
                        </View>

                        <View className="w-full">
                            <Input
                                value={address.adresse}
                                handleFocus={() => setInputErrors({...inputErrors, adresse: null})}
                                handleChange={text => setAddress({...address, adresse: text})}
                                placeholder="Rue / Suite / Batiment / Appartement"
                                keyboardType='default'
                                label="Votre quartier"
                                multiline
                                showLabel={true}
                                showBorder={true}
                                error={inputErrors.adresse}
                            />
                        </View>
                    </View>

                    <View className="flex-1 pb-3 px-4 w-full flex-row justify-center mt-4">
                        <CustomButton
                            onPress={() => addAddress()}
                            className="bg-primary flex-row justify-center items-center py-3.5 rounded w-full"
                        >
                            <BaseText className="text-[18px] uppercase text-white">Enregister l'adresse</BaseText>
                        </CustomButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default React.memo(DelivryAddressForm);
