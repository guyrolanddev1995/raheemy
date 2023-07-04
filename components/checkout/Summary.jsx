import React from 'react';
import {View} from 'react-native';
import BaseText from "../BaseText";
import {currencyFormat} from "../../Utils";

const Summary = ({totalPrice, totalQuantity, frais_livraison}) => {

  return (
    <View className="w-full space-y-0.5 rounded-md bg-white">
        <View className="flex-row w-full py-3 justify-between px-3 border-b border-slate-100">
          <BaseText>Total des articles</BaseText>
          <BaseText>{totalQuantity}</BaseText>
        </View>

        <View className="flex-row w-full py-3 justify-between px-3 border-b border-slate-100">
            <BaseText>Prix total des articles</BaseText>
            <BaseText>{`${currencyFormat(totalPrice)} FCFA`}</BaseText>
        </View>

        <View className="flex-row w-full py-3 justify-between px-3 border-b border-slate-100">
            <BaseText>Frais de livraison</BaseText>
            <BaseText className="text-green-600">{` + ${currencyFormat(frais_livraison)} FCFA`}</BaseText>
        </View>
    </View>
  );
}

export default React.memo(Summary);
