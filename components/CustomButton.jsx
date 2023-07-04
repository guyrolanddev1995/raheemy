import {TouchableOpacity} from "react-native";

const CustomButton = ({children, ...props}) => {
    return (
        <TouchableOpacity
            {...props}
        >
            {children}
        </TouchableOpacity>
    )
}

export default CustomButton