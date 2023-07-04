import {Text} from "react-native";
import {FONT_SIZE} from "../commons/Fonts";

const BaseText = (props) => {
    const {
        size = FONT_SIZE,
        children
    } = props

    return <Text style={{fontSize: size}} {...props}>{children}</Text>
}

export default BaseText