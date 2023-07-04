import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Image, Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useSelector} from "react-redux";
import useRouteIntendStore from "../../../hooks/UseRouteIntendStore";
import CustomStatusBar from "../../../components/CustomStatusBar";
import {Feather, Ionicons} from "@expo/vector-icons";
import BaseText from "../../../components/BaseText";
import axiosInstance from "../../../services/axios";
import {showMessage} from "react-native-flash-message";
import useClearAuthUser from "../../../hooks/useClearAuthUser";
import Spinner from "../../../components/Spinner";
import {currencyFormat} from "../../../Utils";
import {DateTime} from "luxon";
import OrderDetailsProducts from "./OrderDetailsProducts";
import OrderDetailsAddress from "./OrderDetailsAddress";
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import ModalLoading from "../../../components/ModalLoading";
import HeaderActions from "../../../components/HeaderActions";
const OrderDetailsHeader = ({handleBack}) => {
  return (
      <>
        <CustomStatusBar backgroundColor="white"/>
        <View
            style={{marginTop: StatusBar.currentHeight}}
            className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
        >
          <Pressable
              onPress={handleBack}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black"/>
          </Pressable>

          <View className="w-[75%] max-w-[75%] flex-1">
            <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left">
              Détails
            </BaseText>
          </View>

          <HeaderActions/>
        </View>
      </>
  )
}

const OrderDetails = ({navigation, route}) => {
  const {isAuthenticated} = useSelector(state => state.user)
  const {storeIntendedRoute} = useRouteIntendStore()
  const {clearAuthUserInfos} = useClearAuthUser()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const [showDialog, setShowDialog] = useState(false)

  const openDialog = useCallback(() =>  setShowDialog(true), [])
  const closeDialog = useCallback(() =>  setShowDialog(false), [])

  const fetchOrder = async () => {
    setLoading(true)

    try {
      const response = await axiosInstance.get(`/orders/${route.params.code}/details`);
      setOrder(response.data)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        await clearAuthUserInfos()
        showMessage({
          message: "Votre session a expirée; Veuillez vous conencter",
          type: "error",
        });

        navigation.navigate("Login")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveOrder = async () =>  {
    closeDialog()
    setRemoveLoading(true)

    try {
      const response = await axiosInstance.delete(`/orders/${route.params.code}/customer/delete`)

      showMessage({
        message: "La commande a été supprimée avec succès",
        type: "success",
      });

      navigation.navigate("UserOrderList")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await clearAuthUserInfos()
        showMessage({
          message: "Votre session a expirée; Veuillez vous conencter",
          type: "error",
        });

        navigation.navigate("Login")
      }
    } finally {
      setRemoveLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      storeIntendedRoute("UserOrderList")
      navigation.navigate("Login");
    }

    fetchOrder()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
      <View style={{flex: 1}}>
        {loading ? (
            <Spinner />
        ) : (
            <>
              <OrderDetailsHeader
                  handleBack={() => navigation.goBack()}
              />

              {removeLoading  && <ModalLoading/>}

              <ScrollView
                  className="pt-3 pb-6 px-2 flex-1"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: 5}}
              >
                <View className="w-full mb-1 items-start justify-start bg-white px-2 py-2 rounded relative">
                  <View className="flex-1 flex-row">
                    <BaseText numberOfLines={1} className="text-[15px] font-[700] text-left">Commande</BaseText>
                    <BaseText numberOfLines={1} className="text-[15px] font-[700] text-blue-500">{` #${order?.code}`}</BaseText>
                  </View>

                  <BaseText numberOfLines={1} className="text-[15px] mt-1 font-[600]  text-left">
                    {`${order?.products?.length} article(s) commandé(s)`}
                  </BaseText>

                  <BaseText numberOfLines={1} className="text-[15px] mt-1 font-[600] text-left">
                    {`Montant total des articles: ${currencyFormat(order?.amount)} FCFA`}
                  </BaseText>

                  <BaseText numberOfLines={1} className="text-[15px] mt-1 font-[600] text-left">
                    {`Frais de livraison: ${currencyFormat(order?.commune?.frais_livraison)} FCFA`}
                  </BaseText>

                  <BaseText numberOfLines={1} className="text-[15px] mt-1 font-[600] text-left">
                    {`Montant à verser: ${currencyFormat(parseInt(order?.amount) + parseInt(order?.commune?.frais_livraison))} FCFA`}
                  </BaseText>

                  <BaseText numberOfLines={1} className="text-[14px] font-[600] mt-1 text-left">
                    {`Commandé(s) le: ${DateTime.fromISO(order?.created_at).toFormat('dd/LL/yyyy HH:mm:ss')}`}
                  </BaseText>
                </View>

                <View className="mt-2">
                  <OrderDetailsProducts products={order?.products}/>
                </View>

                {order && <OrderDetailsAddress order={order}/>}

                {order?.status == 0 && <View
                    className="px-3 pt-5 pb-9"
                >
                  <CustomButton
                      onPress={openDialog}
                      className="bg-primary py-3 w-full rounded-full"
                  >
                    <BaseText className="text-[16px] font-[700] uppercase text-center text-white">Annuler la commande</BaseText>
                  </CustomButton>
                </View>}

                <CustomModal
                    showModal={showDialog}
                    handleClose={closeDialog}
                    animation="fade"
                >
                  <View className="px-1 py-2">
                    <View className="text-[20px] flex-row justify-center font-semibold mt-2">
                      <Feather name="alert-circle" size={50} color="red" />
                    </View>
                    <BaseText className="text-[17px] mt-5 font-medium text-center">
                      Voulez-vous vraiment supprimer cette commande ?
                    </BaseText>

                    <View className="flex-row w-full justify-center items-center space-x-3 mt-10">
                      <CustomButton
                          onPress={closeDialog}
                          className="bg-gray-200 px-5 py-2.5 rounded-full"
                      >
                        <BaseText className="text-[15px] font-medium">Annuler</BaseText>
                      </CustomButton>
                      <CustomButton
                          onPress={handleRemoveOrder}
                          className="bg-primary px-5 py-2.5 rounded-full"
                      >
                        <BaseText className="text-[15px] text-white font-medium">Supprimer</BaseText>
                      </CustomButton>
                    </View>
                  </View>
                </CustomModal>
              </ScrollView>
            </>
        )}
      </View>
  );
}

export default OrderDetails;
