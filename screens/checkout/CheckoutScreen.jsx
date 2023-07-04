import React, {useEffect, useLayoutEffect, useState} from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Ionicons } from "@expo/vector-icons";
import BaseText from "../../components/BaseText";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchDelivryAddress } from "../../app/features/delivryAddressSlice";
import Spinner from "../../components/Spinner";
import { useIsFocused } from "@react-navigation/native";
import { DelivryAddressSelected } from "../../components/checkout/DelivryAddressSelected";
import { EmptyCard } from "../../components/checkout/EmptyCard";
import PaimentModeSelected from "../../components/checkout/PaimentModeSelected";
import Summary from "../../components/checkout/Summary";
import BottomBar from "../../components/BottomBar";
import { currencyFormat } from "../../Utils";
import CustomButton from "../../components/CustomButton";
import useCart from "../../hooks/useCart";
import useClearAuthUser from "../../hooks/useClearAuthUser";
import { showMessage } from "react-native-flash-message";
import axiosInstance from "../../services/axios";
import {clearCheckout} from "../../app/features/checkoutSlice";
import {clearCart} from "../../app/features/cartSlice";
import ModalLoading from "../../components/ModalLoading";

const CheckoutDelivryAddressHeader = ({ handleBack }) => {
  return (
    <>
      <CustomStatusBar backgroundColor="white" />
      <View
        style={{ marginTop: StatusBar.currentHeight }}
        className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
      >
        <Pressable onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>

        <View className="w-[75%] max-w-[75%]">
          <BaseText
            numberOfLines={1}
            className="text-[17px] font-[700] text-left"
          >
            Confirmer votre commande
          </BaseText>
        </View>
      </View>
    </>
  );
};

const CheckoutScreen = ({ navigation }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { address, loading } = useSelector((state) => state.delivryAddress);
  const { addressSelected, paiementMode, frais_livraison } = useSelector(
    (state) => state.checkout
  );
  const cart = useSelector((state) => state.cart.cart);

  const [totalQuantity, totalPrice] = useCart();
  const {clearAuthUserInfos} = useClearAuthUser()

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const total = parseInt(totalPrice) + parseInt(frais_livraison);

  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const redirectIfUnauthenticated = async (url) => {
    await AsyncStorage.setItem("intend", url);
  };

  const validateCheckoutSteps = async () => {
    if (!addressSelected) {
      showMessage({
        message: "Veuillez sélectionner votre adresse de livraison",
        type: "danger",
      });

      navigation.navigate("CheckoutDelivryAddress");
      return false
    }

    if (!paiementMode) {
      showMessage({
        message: "Veuillez sélectionner le mode de paiement",
        type: "danger",
      });

      navigation.navigate("ModePaiment");
      return false
    }
  };

  const submitCheckout =  async () => {
    const response = await validateCheckoutSteps();

    if(response !== false) {
        const data = {
            products: cart,
            amount: totalPrice,
            address: addressSelected?.id,
            mode_paiement: paiementMode?.value
        }

        setCheckoutLoading(true)

        try {
            const response = await axiosInstance.post(`/commande/add`, data);

            if(response.data.data.mode_paiement === "mobile-money" || response.data.data.mode_paiement === "bank-cart") {

                navigation.navigate("WebView", {
                    mode_paiement: response.data.data.mode_paiement,
                    reference: response.data.data.payment_ref
                })

            } else  {
                navigation.replace("SuccessPayment")

                dispatch(clearCheckout())
                dispatch(clearCart())
            }

        } catch(error) {
            if(error.response) {
                if(error.response.status === 401) {
                    await clearAuthUserInfos()
                    await redirectIfUnauthenticated()
                    showMessage({
                        message: "Votre session a expirée; Veuillez vous conencter",
                        type: "error",
                    });

                    navigation.navigate("Login")

                    return

                }

                if(error.response.status === 500 && error.response.data.type_error === "PDO") {
                    showMessage({
                        message: "L'un produit que vous essayez de commander est en rupture de stock",
                        type: "danger",
                    });
                }
            }

        } finally {
            setCheckoutLoading(false)
        }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      redirectIfUnauthenticated("Checkout");
      return navigation.navigate("Login");
    }

    if (cart.length === 0) {
      navigation.navigate("Home");
    }

    if (address?.length === 0 || addressSelected == null) {
      dispatch(fetchDelivryAddress({ navigation }));
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1">
      {loading && (
        <View className="flex-1 justify-center items-center">
          <Spinner />
        </View>
      )}

        {checkoutLoading && <ModalLoading title={"Veuillez patienter"} showTitle={true}/>}

      {!loading && (
        <>
          <CheckoutDelivryAddressHeader
            handleBack={() => navigation.goBack()}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            <View className="mt-2 px-3 space-y-2">
              {addressSelected ? (
                <DelivryAddressSelected
                  address={addressSelected}
                  handleAddressSelected={() =>
                    navigation.navigate("CheckoutDelivryAddress")
                  }
                />
              ) : (
                <EmptyCard
                  title="Sélectionner votre adresse de livraison"
                  handlePressed={() =>
                    navigation.navigate("CheckoutDelivryAddress")
                  }
                />
              )}
            </View>

            <View className="mt-4 px-3 space-y-2">
              {paiementMode ? (
                <PaimentModeSelected
                  paiementMode={paiementMode}
                  handlePaimentMode={() => navigation.navigate("ModePaiment")}
                />
              ) : (
                <EmptyCard
                  title="Sélectionner votre mode de paiement"
                  handlePressed={() => navigation.navigate("ModePaiment")}
                />
              )}
            </View>

            <View className="mt-4 px-3 space-y-2">
              <Summary
                frais_livraison={frais_livraison}
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
            </View>
          </ScrollView>

          <BottomBar>
            <View className="w-full space-x-6">
              <View className="flex-row justify-between items-center">
                <BaseText className="text-[18px] font-[600]">
                  Montant total
                </BaseText>
                <BaseText className="text-[18px] font-[600]">{`${currencyFormat(
                  total
                )} FCFA`}</BaseText>
              </View>
              <View className="mt-10">
                <CustomButton
                  onPress={submitCheckout}
                  className="bg-red-600 px-4 py-3 flex flex-row space-x-3 items-center justify-center rounded-full"
                >
                  <BaseText className="text-white text-[16px] text-center uppercase">
                    Confirmer le paiement
                  </BaseText>
                </CustomButton>
              </View>
            </View>
          </BottomBar>
        </>
      )}
    </View>
  );
};

export default CheckoutScreen;
