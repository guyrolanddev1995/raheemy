import {Pressable, StatusBar, View} from "react-native";
import CustomStatusBar from "../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, setSelectedCategorie} from "../app/features/categorieSlice";
import CategorieSidebarSection from "../components/categorie/CategorieSidebarSection";
import CategorieMainSection from "../components/categorie/CategorieMainSection";
import HeaderActions from "../components/HeaderActions";
const CategoriesHeader = ({handleBack}) => {
    return (
        <>
            <CustomStatusBar backgroundColor="white"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-white flex-row w-full items-center space-x-4 px-4 py-3"
            >
                <SearchBar/>

                <HeaderActions showSearch={false}/>
            </View>
        </>
    )
}

const CategorieScreen = ({navigation}) => {
    const {categories, categorieSelected} = useSelector(state => state.categorie)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);
    return(
        <View className="flex-1">
            <CategoriesHeader
                handleBack={() => navigation.goBack()}
            />

            <View className="flex-row w-full h-full">
                <CategorieSidebarSection
                    categories={categories}
                    categorieSelectedId={categorieSelected?.id}
                    handleCategorieSelected={categorie => dispatch(setSelectedCategorie(categorie)) }
                />

                <CategorieMainSection
                    categorieChildren={categorieSelected?.children}
                />
            </View>
        </View>
    )
}

export default CategorieScreen