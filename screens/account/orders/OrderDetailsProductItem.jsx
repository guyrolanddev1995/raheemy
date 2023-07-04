import {Image, View} from "react-native";
import BaseText from "../../../components/BaseText";
import {currencyFormat} from "../../../Utils";
import React from "react";
import defaultProductImage from "../../../assets/default.png";

const OrderDetailsProductItem = ({product}) => {
	const image =  product.pivot.product_type === "variable" && product.pivot.variation_image
		? product.pivot.variation_image
		: product.product_image

	return (
		<View className="flex-row border-b border-slate-50 py-3">
			<View className="w-[20%] h-[70px] rounded">
				{image ? (<Image
					source={{uri: image }}
					className="w-full h-full rounded object-contain rounded"
				/>) : (
					<Image
						source={defaultProductImage}
						className="w-full h-full rounded object-contain rounded"
					/>
				)}
			</View>
			<View className="w-full flex-1 ml-2">
				<BaseText numberOfLines={2} className="text-[13.5px] font-[700] text-left">{product.nom}</BaseText>

				<>
					{product.pivot.product_type === "variable" ? (
						<View className="flex-row space-x-1 mt-1">
							{Object.entries(JSON.parse(product.pivot.options)).map(([attribute, attributeValues]) => (
								<View key={attributeValues.value}>
									<View numberOfLines={1} className=" bg-blue-500 rounded px-0.5  py-0.5 min-w-[20px]">
										<BaseText className="text-[10px] font-[700] text-white text-center">{`${attribute}: ${attributeValues.value}`}</BaseText>
									</View>
								</View>
							))}
						</View>
					) : (
						<View></View>
					)}
				</>

				<BaseText numberOfLines={1} className="text-[13.5px] font-[400] mt-1 text-left">{`Qte: ${product.pivot.quantity}`}</BaseText>
				<BaseText numberOfLines={1} className="text-[13.5px] font-[400] mt-1 text-left">{currencyFormat(product.pivot.price) + " FCFA"}</BaseText>
			</View>
		</View>
	)
}

export default OrderDetailsProductItem