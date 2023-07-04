import { TextInput, View } from "react-native";
import BaseText from "./BaseText";
import React from "react";

const Input = (props) => {
  const {
    label,
    showLabel = false,
    value,
    placeholder,
    placeholderTextColor = "#9ca3af",
    error,
    showBorder = false,
    handleChange,
    handleFocus,
    isPassword = false
  } = props;
  return (
    <View>
      {showLabel && label && (
        <View className="mb-2">
          <BaseText className="font-[700]">{label}</BaseText>
        </View>
      )}
      <View
        className={`
            w-full bg-white flex-row items-center h-14 rounded
            ${error ? "border-2 border-primary" : ""}
            ${showBorder ? "border border-slate-400" : ""}
       `}
      >
        <TextInput
          value={value}
          className={`flex-1 pl-3`}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={handleChange}
          onFocus={handleFocus}
          {...props}
        />
      </View>
      {error && (
        <BaseText className="text-sm text-primary font-semibold mt-2">
          {error}
        </BaseText>
      )}
    </View>
  );
};

export default Input;
