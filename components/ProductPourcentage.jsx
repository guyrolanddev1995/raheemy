import {Platform, View} from "react-native";
import BaseText from "./BaseText";
import React from "react"
import {PRIMARY_COLOR} from "../commons/Colors";
const ProductPourcentage = ({reduction}) => {
    let pourcentage = null

    if(reduction && reduction !== 'null') {
        const label =  !reduction.startsWith('-')
            ? "-" + Math.floor(Number(reduction)) + "%"
            : Math.floor(Number(reduction)) + "%";

        pourcentage = (
            <View style={{ backgroundColor: PRIMARY_COLOR, borderRadius: 4, padding: 2 }}>
                <BaseText style={{ color: 'white', fontSize: Platform.OS === "ios" ? 15 : 12.5 }}>{label}</BaseText>
            </View>
        );
    }

    return pourcentage
}

export default React.memo(ProductPourcentage)