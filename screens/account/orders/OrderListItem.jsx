import React from 'react';
import {Pressable, View} from 'react-native';
import BaseText from "../../../components/BaseText";
import {currencyFormat} from "../../../Utils";
import {DateTime} from "luxon";
import {useNavigation} from "@react-navigation/native";

const StatusComponent = ({title, color}) => {
    return (
        <View className={` px-1 py-0.5 rounded ${color}`}>
            <BaseText numberOfLines={1} className="text-[12px] font-[700] text-white text-left">{title}</BaseText>
        </View>
    )
}

const OrderListItem = ({order}) => {
  let status;
  const navigation = useNavigation()

  switch (order.status) {
      case '1':
          status = <StatusComponent title="en cours de traitement" color="bg-blue-400"/>
          break;
      case '2':
          status = <StatusComponent title="en cours de livraison" color="bg-blue-800"/>
          break;
      case '3':
          status = <StatusComponent title="livrée" color="bg-green-600"/>
          break;
      case '4':
          status = <StatusComponent title="rejetée" color="bg-red-600"/>
          break;
      default:
          status = <StatusComponent title="en attente" color="bg-orange-500"/>
          break;
  }
  return (
      <Pressable
          onPress={() => navigation.navigate("UserOrderDetails", {code: order.code})}
          className="w-full mb-1 items-start justify-start bg-white px-2 py-2 rounded relative"
      >
          <View className="flex-row items-center mb-1.5">
              <View className="flex-1 flex-row">
                  <BaseText numberOfLines={1} className="text-[15px] font-[700] text-left">Commande</BaseText>
                  <BaseText numberOfLines={1} className="text-[15px] font-[700] text-blue-500">{` #${order.code}`}</BaseText>
              </View>

              <View>{status}</View>
          </View>

          <BaseText numberOfLines={1} className="text-[15px] mt-1  text-left">
              {`${order.products_count} article(s)`}
          </BaseText>

          <BaseText numberOfLines={1} className="text-[15px] mt-1 font-[600] text-left text-primary">
              {`${currencyFormat(order.amount)} FCFA`}
          </BaseText>
          <BaseText numberOfLines={1} className="text-[14px] mt-1 text-left">
              { DateTime.fromISO(order?.created_at).toFormat('dd/LL/yyyy HH:mm:ss') }
          </BaseText>
      </Pressable>
  );
}

export default React.memo(OrderListItem);
