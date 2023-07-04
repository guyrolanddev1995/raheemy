import React from "react";
import { Image, Pressable, View } from "react-native";
import BaseText from "../BaseText";
import { findPaimentMode } from "../../data/PaiementMode";

const PaimentModeSelected = ({ paiementMode, handlePaimentMode }) => {
  const selected = findPaimentMode(paiementMode.value);

  return (
    <Pressable
      onPress={handlePaimentMode}
      className={`w-full px-3 py-3 space-y-0.5 rounded-md bg-white`}
    >
      <View className="flex-row flex-wrap w-full space-x-3">
        {selected.images.map((img, index) => (
          <View className="w-14 h-14 rounded" key={index}>
            <Image
              source={img}
              className="w-full h-full object-contain rounded"
            />
          </View>
        ))}
      </View>
      <BaseText>{selected.label}</BaseText>
    </Pressable>
  );
};

export default React.memo(PaimentModeSelected);
