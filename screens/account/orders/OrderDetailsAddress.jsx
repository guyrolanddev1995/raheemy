import {View} from "react-native";
import BaseText from "../../../components/BaseText";
import React from "react";

const StatusComponent = ({title, color}) => {
	return (
		<View className="flex-row items-center">
			<BaseText
				numberOfLines={1}
				className={`text-[13px]`}
			>
				Status:
			</BaseText>

			<BaseText
				numberOfLines={1}
				className={`text-[13px] ml-2 ${color}`}
			>
				{title}
			</BaseText>
		</View>
	)
}

const OrderStatusPayment = ({paymentStatus}) => {
	let status

	switch (paymentStatus) {
		case 1:
            status = <StatusComponent title={"Soldé"} color={"text-green-600"}/>
            break;
        case -1:
			status = <StatusComponent title={"Echec de transaction"} color={"text-red-600"}/>
            break;
        default:
            status = <StatusComponent title={"En attente de paiement"} color={"text-blue-600"}/>
            break;
	}

	return <>{status}</>
}

const OrderDetailsAddress = ({order}) => {
	return (
		<View className="w-full mb-1 mt-2 items-start space-y-4 justify-start bg-white px-2 py-2 rounded relative">
			<View>
				<BaseText numberOfLines={1} className="text-[15px] font-[700] text-left mb-4">Solution de paiement</BaseText>

				{order.mode_paiement === "bank-cart" && (
					<>
						<BaseText numberOfLines={1} className="text-[15px] text-left">Paiement par carte bancaire</BaseText>
						<OrderStatusPayment paymentStatus={order?.payment_status} />
					</>
				)}

				{order.mode_paiement === "mobile-money" && (
					<>
						<BaseText numberOfLines={1} className="text-[15px] text-left">Paiement par Mobile Money</BaseText>
						<OrderStatusPayment paymentStatus={order?.payment_status} />
					</>
				)}

				{order.mode_paiement === "deliver" && (
					<>
						<BaseText numberOfLines={1} className="text-[15px] text-left mb-1">Paiement à la livraison</BaseText>
					</>
				)}
			</View>

			<View className="w-full h-0.5 bg-slate-50"></View>

			<View className="">
				<BaseText numberOfLines={1} className="text-[15px] font-[700] text-left mb-4">Adresse de livraison</BaseText>

				<View className="space-y-1">
					<BaseText numberOfLines={1} className="text-[15px] text-left">{order?.nom}</BaseText>

					<View className="flex-row items-center">
						<BaseText numberOfLines={1} className="text-[15px] text-left ">{`+225 ${order?.phone1}`}</BaseText>
						{order.phone2 && <BaseText numberOfLines={1} className="text-[15px] text-left ">{`/ +225 ${order?.phone2}`}</BaseText>}
					</View>

					<View className="flex-row items-center">
						<BaseText numberOfLines={1} className="text-[15px] text-left">{order?.ville?.nom}</BaseText>
						<BaseText numberOfLines={1} className="text-[15px] text-left">{` - ${order?.commune?.nom}`}</BaseText>
					</View>

					<BaseText numberOfLines={4} className="text-[15px] text-left">{order?.adresse}</BaseText>
				</View>
			</View>
		</View>
	)
}

export default React.memo(OrderDetailsAddress)