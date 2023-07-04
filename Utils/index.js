import {Text} from "react-native";

export const currencyFormat = (price) => {
    return new Intl.NumberFormat().format(price)
}

export const ucFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}