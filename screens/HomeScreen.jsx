import {View, FlatList, Pressable, StatusBar, Share, Platform} from "react-native";
import React, {useEffect} from "react";
import CustomStatusBar from "../components/CustomStatusBar";
import FeaturedCategorieSection from "../components/FeaturedCategoriesSection";
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../components/product/ProductCard";
import {Ionicons} from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";;
import {fetchAppData} from "../app/features/appSlice";
import HomeCatalogueSkeleton from "../components/skeletons/HomeCatalogueSkeleton";
import HomeBanner from "../components/HomeBanner";
import CategoriesCollection from "../components/categorie/collections/CategoriesCollection";

const HomeHeader = () => {

    const handleShareApp = async () => {
        let message = Platform.OS == "ios"
            ? "Raheemy; Votre premiere plate-forme de fripperie en cote d'ivoire"
            : "Raheemy; Votre premiere plate-forme de fripperie en cote d'ivoire https://play.google.com/store/apps/details?id=com.raheemy.app"

        let url = Platform.OS == "ios"
            ? "https://apps.apple.com/us/app/raheemy/id6446229310"
            : "https://play.google.com/store/apps/details?id=com.raheemy.app"

        await Share.share({
            message: message,
            url: url,
            title: "Raheemy"
        }, {
            dialogTitle: "Raheemy Application",
        })


    }

    return (
        <View
            style={{marginTop: StatusBar.currentHeight}}
            className="bg-white flex-row w-full items-center space-x-4 border-gray-200 px-4 py-3"
        >
            <Pressable
                onPress={handleShareApp}
                className="mr-3"
            >
                <Ionicons name="share-social-outline" size={24} color="black"/>
            </Pressable>
            <SearchBar/>
        </View>
    )
}

const Home = ({navigation}) => {
    const {
        featuredProducts,
        featuredCategories,
        medias,
        collections,
        loading
    } = useSelector(state => state.appData)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchAppData())
    }, [dispatch])

    return (
       <View className="flex-1">
           <CustomStatusBar backgroundColor="white"/>
           <HomeHeader/>

           {loading  ? (
               <HomeCatalogueSkeleton/>
           ) : (
               <FlatList
               className="flex-1"
               data={featuredProducts}
               showsVerticalScrollIndicator={false}
               numColumns={2}
               columnWrapperStyle={{
                   columnGap: 8,
                   paddingHorizontal: 6
               }}
               renderItem={({item}) => (
                   <ProductCard
                        title={item.nom}
                        id={item.id}
                        sale_price={item.prix_promo}
                        price={item.prix}
                        image={item.product_image}
                        product_condition={item.product_condition}
                        pourcentage={item.pourcentage_reduction}
                        product_type={item.product_type}
                        slug={item.slug}
                        quantite={item.quantite}
                        uuid={item.uuid}
                        maxPrice={item.max_price}
                        minPrice={item.min_price}
                        variations={item.variations}
                   />
               )}
               ListHeaderComponent={() => (
                   <>
                       <HomeBanner medias={medias}/>
                       <FeaturedCategorieSection categories={featuredCategories}/>

                       <CategoriesCollection collections={collections}/>
                   </>
               )}
           />
           )}
       </View>
    )
}

export default Home