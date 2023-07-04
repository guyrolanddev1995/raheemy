import {Pressable, ScrollView, StatusBar, Text, TextInput, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import CustomStatusBar from "../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import axiosInstance from "../services/axios";
import BaseText from "../components/BaseText";

const SearchScreen = ({navigation}) => {
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (text) => {
        setSearchInput(text)

        try {
            const response = await axiosInstance.get(`/v2/products/search?q=${searchInput}&type=products`)
            setSearchResults(response.data)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [])

    return (
        <View className="flex-1 bg-white">
            <CustomStatusBar backgroundColor="white"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-white flex-row w-full items-center space-x-4 px-4 py-3"
            >
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>
                </Pressable>

                <View className="flex-1 w-full flex-row items-center bg-slate-200 h-10 pl-4 pr-1 py-1 rounded-full">
                    <TextInput
                        value={searchInput}
                        onChangeText={handleSearch}
                        className="flex-1 h-full text-black placeholder:text-black"
                        placeholder="Rechercher..."
                        focusable={true}
                        inputMode="search"
                        placeholderTextColor={"black"}
                    />

                    <Pressable
                        onPress={() => navigation.navigate("Product Catalog", {
                            slug: searchInput,
                            title: searchInput,
                            type: "SearchCatalogue"
                        })}
                        style={({ pressed }) => [
                            styles.searchButton,
                            { backgroundColor: pressed ? '#9ca3af' : 'black'},
                        ]}
                    >
                        <Ionicons name="ios-search" size={18} color={"white"}/>
                    </Pressable>
                </View>
            </View>

            <ScrollView
                className="w-full"
                showsVerticalScrollIndicator={false}
            >
                {searchResults.map((result, index) => (
                    <Pressable
                        key={index}
                        onPress={() => navigation.navigate("Product Catalog", {
                            slug: result.nom,
                            title: result.nom,
                            type: "SearchCatalogue"
                        })}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#f1f5f9' : 'transparent',  },
                            {paddingHorizontal: 16}
                        ]}
                    >
                        <View className="w-full py-3.5 flex-row border-b border-slate-100">
                            <Ionicons name="search" size={16} />
                            <BaseText style={styles.text}  numberOfLines={1}>{result.nom.toLowerCase()}</BaseText>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = {
    text: {
        fontSize: 14.5,
        marginLeft: 5,
    },

    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
        width: 56,
        paddingVertical: 4,
        height: "100%"
    }
};

export default SearchScreen;