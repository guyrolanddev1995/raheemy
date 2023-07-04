import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BaseText from "../BaseText";

const DelivryAddressItem = ({address}) => {
  return (
      <View>
        <BaseText className='text-[14px] mb-1'>{address.nom}</BaseText>
        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.phone1} { address.phone2 ? `/ ${address.phone2}` : ''}</BaseText>
        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.adresse}</BaseText>
        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.ville.nom} {`, ${address.commune.nom}`}</BaseText>

        <Pressable
            className="mt-2"
            onPress={() => console.log("cool")}
        >
          <BaseText className="text-blue-400 text-[13px] uppercase">Modifier</BaseText>
        </Pressable>
      </View>
  );
}

export default DelivryAddressItem;
