import {memo} from "react";
import {currencyFormat} from "../../Utils";
import BaseText from "../BaseText";

const Price = memo(({
  price,
  size= "text-[17px]",
  color="text-primary",
  weight = "font-[500]"
}) => {
    return (
        <BaseText className={`text-left ${color} ${size} ${weight}`}>{currencyFormat(price)} FCFA</BaseText>
    )
})

export default Price