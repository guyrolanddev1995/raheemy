import {memo} from "react";
import {View} from "react-native";
import {currencyFormat} from "../../Utils";
import BaseText from "../BaseText";

const SalePrice = ({price, sale_price, priceStyles, oldPriceStyle, direction = "column"}) => {

    const containerDirection = direction === "row" ? "flex-row items-baseline space-x-3" : ""

    return (
        <View className={containerDirection}>
            <BaseText className={priceStyles}>{currencyFormat(sale_price)} FCFA</BaseText>
            <View className="flex-row space-x-2 mb-1">
                <BaseText className={`line-through text-left ${oldPriceStyle}`}>{currencyFormat(price)} FCFA</BaseText>
            </View>
        </View>
    )
}

export default memo(SalePrice)