import React from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import {Feather, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const AuthHeaderAction = () => {
    const navigation = useNavigation()

    return (
        <View className={`
           ${Platform.OS === "android" ? "pt-4" : "pt-2"}
           w-full flex-1 flex-row justify-between 
        `}>
          <Pressable
              onPress={() => navigation.goBack()}
              className="ml-2"
          >
            <Ionicons name="arrow-back-outline" size={24} color="black"/>
          </Pressable>

            <View>
                <Pressable
                    onPress={() => navigation.navigate("Home")}
                    className="ml-2"
                >
                    <Feather name="home" size={24} color={"black"} />
                </Pressable>
            </View>
        </View>
    );
}

export default React.memo(AuthHeaderAction);
