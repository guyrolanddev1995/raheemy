import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BaseText from "../../../components/BaseText";

const UserDelivryAdressItem = ({address}) => {
    return (
        <View
            onPress={() => console.log("selected")}
            className={ `w-full bg-white px-3 py-3 space-y-0.5 rounded-md`}
        >
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
        </View>
    );
}

export default UserDelivryAdressItem;
