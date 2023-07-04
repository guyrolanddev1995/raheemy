import Wrapper from "./Wrapper";
import {Provider} from "react-redux";
import {store} from "./app/store";
import FlashMessage from "react-native-flash-message";
import {View} from "react-native";
import {useEffect} from "react";

export default function App() {
    return (
        <Provider store={store}>
            <View className="flex-1">
                <Wrapper/>
                <FlashMessage
                    position="bottom"
                    icon={{icon: "danger", position: "right" }}
                    duration={3000}
                    style={{
                        minHeight: 70,
                        alignItems: "center"
                    }}
                />
            </View>
        </Provider>
   );
}
