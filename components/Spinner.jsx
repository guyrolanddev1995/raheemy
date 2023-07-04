import {ActivityIndicator, View} from "react-native";
import {PRIMARY_COLOR} from "../commons/Colors";

const Spinner = ({color=PRIMARY_COLOR, size= 35, fullSize = true}) => {
    return (
        <View className={`
             ${fullSize ? 'flex-1 justify-center items-center': ''}
        `}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    )
}

export default Spinner