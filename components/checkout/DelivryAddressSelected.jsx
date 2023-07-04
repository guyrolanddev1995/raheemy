import {Pressable, View} from "react-native";
import BaseText from "../BaseText";
import React from "react";

export const DelivryAddressSelected = ({address, selectedAddressId, handleAddressSelected}) => {
	return (
		<Pressable
			onPress={handleAddressSelected}
			className={ `w-full px-3 py-3 space-y-0.5 rounded-md bg-white`}
		>
			<View>
				<BaseText className='text-[15px] mb-1'>{address.nom}</BaseText>
				<BaseText className='text-[13px] text-gray-900 font-[500]'>{address.phone1} { address.phone2 ? `/ ${address.phone2}` : ''}</BaseText>
				<BaseText className='text-[13px] text-gray-900 font-[500]'>{address.adresse}</BaseText>
				<BaseText className='text-[13px] text-gray-900 font-[500]'>{address.ville.nom} {`, ${address.commune.nom}`}</BaseText>
			</View>
		</Pressable>
	);
}

export default React.memo(DelivryAddressSelected)