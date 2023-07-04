import React from 'react';
import {Text, View} from 'react-native';
import BaseText from "../BaseText";

const UserInfo = ({user}) => {
  return (
      <View className="flex-row items-center">
        <View className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <BaseText className="text-[22px] font-[600] text-white">{user?.nom[0]}</BaseText>
        </View>
        <View className="ml-2">
          <>
            <BaseText className="text-[17px] font-[700] text-left">{user?.nom}</BaseText>
            <BaseText className="font-[400] text-[13px] text-left mt-1">{user?.telephone}</BaseText>
          </>
        </View>
      </View>
  );
}

export default React.memo(UserInfo);
