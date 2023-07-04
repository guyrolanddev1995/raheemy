import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, Pressable, StatusBar, Text, View} from 'react-native';
import CustomStatusBar from "../components/CustomStatusBar";
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import BaseText from "../components/BaseText";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductCatalogue,
    loadMoreProductCatalogue,
    resetProductCatalogue
} from "../app/features/products/productsCatalogueSlice";
import Spinner from "../components/Spinner";
import ProductCard from "../components/product/ProductCard";
import {EmptyCard} from "../components/checkout/EmptyCard";
import NotFound from "../components/Errors/NotFound";
import HeaderActions from "../components/HeaderActions";

const ProductCatalogHeader = ({title, handleBack}) => {
  return (
      <>
        <CustomStatusBar backgroundColor="white"/>
        <View
            style={{marginTop: StatusBar.currentHeight}}
            className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
        >
          <Pressable
              onPress={handleBack}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black"/>
          </Pressable>

          <View className="w-[75%] max-w-[75%] flex-1">
              <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left">{title}</BaseText>
          </View>

            <HeaderActions/>
        </View>
      </>
  )
}

const ProductCatalogScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { products, loading, pagination } = useSelector((state) => state.product.productCatalogue);

    const onLoadingMoreProducts = () => {
        if(pagination.currentPage < pagination.lastPage) {
            dispatch(loadMoreProductCatalogue({
                slug: route.params.slug,
                page: pagination.currentPage + 1,
                type: route.params.type
            }))
        }
    }

    useEffect(() => {
        dispatch(resetProductCatalogue())
        dispatch(fetchProductCatalogue({
            slug: route.params.slug,
            type: route.params.type
        }));
    }, [dispatch, route.params.slug]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <View style={{ flex: 1 }}>
                    <ProductCatalogHeader
                        title={route.params.title}
                        handleBack={() => navigation.goBack()}
                    />

                    <FlatList
                        style={{ flex: 1 }}
                        data={products}
                        numColumns={2}
                        columnWrapperStyle={{
                            columnGap:8,
                            paddingHorizontal: 8,
                        }}
                        contentContainerStyle={{
                            paddingVertical: 10
                        }}
                        renderItem={({ item }) => (
                            <ProductCard
                                title={item.nom}
                                id={item.id}
                                sale_price={item.prix_promo}
                                price={item.prix}
                                image={item.product_image}
                                product_condition={item.product_condition}
                                product_type={item.product_type}
                                pourcentage={item.pourcentage_reduction}
                                slug={item.slug}
                                maxPrice={item.max_price}
                                minPrice={item.min_price}
                                variations={item.variations}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={() => onLoadingMoreProducts()}
                        ListEmptyComponent={
                           <View className="pt-20">
                               <NotFound
                                   title="Aucun produit disponible dans ce catalogue"
                                   icon={<Feather name="shopping-bag" size={100} color="#e20615" />}
                                   showButton={false}
                               />
                           </View>
                        }
                    />
                </View>
            )}
        </>
    );
};

export default ProductCatalogScreen;
