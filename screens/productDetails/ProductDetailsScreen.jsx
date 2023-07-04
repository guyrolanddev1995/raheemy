import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    useWindowDimensions,
    View
} from "react-native";
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import CustomStatusBar from "../../components/CustomStatusBar";
import SearchBar from "../../components/SearchBar";
import {Ionicons, Feather} from "@expo/vector-icons";
import axiosInstance from "../../services/axios";
import BaseText from "../../components/BaseText";
import SalePrice from "../../components/product/SalePrice";
import Price from "../../components/product/Price";
import Badge from "../../components/Badge";
import Spinner from "../../components/Spinner";
import RenderHtml from 'react-native-render-html';
import {htmlRender, tagsStyles} from "../../commons/HtmlTagsStyle";
import ProductDetailsFooter from "../../components/product/ProductDetailsFooter";
import ProductDetailsVariableCard from "./ProductDetailsVariableCard";
import ProductVariationsPrices from "./ProductVariationsPrices";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ProductDetailsVariations from "./ProductDetailsVariations";
import {addToCart} from "../../app/features/cartSlice";
import {useDispatch} from "react-redux";
import HeaderActions from "../../components/HeaderActions";

const ProductDetailSHeader = React.memo(({handleBack}) => {
    return (
        <>
            <CustomStatusBar backgroundColor="#f8fafc"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-slate-50 flex-row w-full items-center space-x-4 px-4 py-3"
            >
                <Pressable
                    onPress={handleBack}
                    className="mr-3"
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>
                </Pressable>
                <SearchBar/>
                <HeaderActions showSearch={false}/>
            </View>
        </>
    )
})

const ProductDetailsScreen = ({navigation, route}) => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {width, height} = useWindowDimensions()
    // ref
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['95%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleCloseBottomSheet = useCallback(() => {
        bottomSheetModalRef.current?.close();
    })

    const getProduct = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get(`v2/products/${route.params.slug}`)
            setProduct(response.data.data)

        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }
    const handleAddToCart = (item) => {
        let productForCart = {}

        if(item.type === "variation") {
            productForCart = {
                quantity: item.quantity,
                uuid: item.data?.uuid,
                id: item.data?.id,
                nom: product.nom,
                prix: item.data?.prix_promo ? item.data?.prix_promo : item.data?.prix,
                attributes: {
                    slug: product.slug,
                    image:item.data?.gallerie.length > 0 ? item.data?.gallerie[0].url : product.product_image,
                    product_quantity: item.data?.quantite,
                    product_type: product.product_type,
                    variation_options: item.data?.attributes ? item.data?.attributes : null
                }
            }
        } else {
            productForCart = {
                quantity: item.quantity,
                uuid: product.uuid,
                id: product.id,
                nom: product.nom,
                prix: product.prix_promo ? product.prix_promo : product.prix,
                attributes: {
                    slug: product.slug,
                    image: product.product_image,
                    product_quantity: product.quantite,
                    product_type: product.product_type,
                    variation_options: null
                }
            }
        }

        dispatch(addToCart(productForCart))
    }

    const productImages = useMemo(() => {
        const images = []
        images.push(product?.product_image)

        if(product?.gallerie && product?.gallerie.length > 0) {
            product?.gallerie.forEach(item => {
                images.push(item.url)
            });
        }

        return images
    }, [product])


    useEffect(() => {
        getProduct()

        if(route.params.action && route.params.action === "openModal") {
            handlePresentModalPress()

            console.log("cool")
        }
    }, [route.params.slug])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <>
            {loading == true ? (
                <Spinner/>
            ) : (
                <View
                 className="flex-1"
                >
                    <BottomSheetModalProvider>
                        <View
                            className="flex-1"
                        >
                            <ProductDetailSHeader handleBack={() => navigation.goBack()}/>

                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={false}
                            >
                                <View
                                    className="w-full border-b border-slate-50"
                                    style={{maxHeight: 400}}
                                >
                                    <FlatList
                                        data={productImages}
                                        horizontal
                                        pagingEnabled
                                        contentContainerStyle={{
                                            backgroundColor: "black",
                                        }}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item}) => (
                                            <Image
                                                source={{uri: item}}
                                                style={{
                                                    width,
                                                    aspectRatio: 1
                                                }}
                                            />
                                        )}
                                    />
                                </View>

                                <View className="px-4 py-2 bg-white">
                                    {product.product_type === "simple" && <BaseText className="mt-2 mb-3">
                                        <Badge title={product?.product_condition}/>
                                    </BaseText>}

                                    <View className="">
                                        <BaseText className="font-medium text-[16px]">{product?.nom}</BaseText>
                                    </View>

                                    {
                                        product?.product_type === "variable" ? (
                                            <ProductVariationsPrices product={product}/>
                                        ) : (
                                            <View className="flex-row items-center w-full mt-3">
                                                {
                                                    product?.prix_promo ?
                                                        <SalePrice
                                                            price={product?.prix}
                                                            sale_price={product?.prix_promo}
                                                            reduction={product?.pourcentage_reduction}
                                                            priceStyles="text-red-600 text-[20px] text-left font-[700] mb-1.5"
                                                            oldPriceStyle="text-gray-800 font-light text-[14px]"
                                                        />
                                                        : <Price price={product?.prix} size="text-[20px]" weight="font-[700]"/>
                                                }
                                            </View>
                                        )
                                    }

                                    {product?.variations?.length > 0 && <ProductDetailsVariableCard
                                            variations={product?.variations}
                                            openBottomSheet={() => handlePresentModalPress()}
                                        />
                                    }
                                </View>

                                {product.description && <View className="px-4 mt-1 bg-white">
                                    <View className="border-b border-slate-50 py-2.5">
                                        <BaseText className="font-[600] text-[16px]">Détails</BaseText>
                                    </View>

                                    <RenderHtml
                                        contentWidth={width}
                                        source={htmlRender(product.description)}
                                        tagsStyles={tagsStyles}
                                    />
                                </View>}

                                {product.caracteristique && <View className="px-4 mt-1 bg-white">
                                    <View className="border-b border-slate-50 py-2.5">
                                        <BaseText className="font-[600] text-[16px]">Caractéristiques</BaseText>
                                    </View>

                                    <RenderHtml
                                        contentWidth={width}
                                        source={htmlRender(product.caracteristique)}
                                        tagsStyles={tagsStyles}
                                    />
                                </View>}
                            </ScrollView>

                            <ProductDetailsFooter
                                product={product}
                                handleAddToCart={handleAddToCart}
                                openBottomSheet={() => handlePresentModalPress()}
                                handleRedirectHome={() => navigation.navigate("Acceuil")}
                            />
                        </View>

                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            snapPoints={snapPoints}
                            handleIndicatorStyle={{
                                display: "none"
                            }}
                            containerStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                            }}
                        >
                            <View className="bg-white relative flex-1">
                                <Pressable
                                    onPress={handleCloseBottomSheet}
                                    className="absolute z-50 top-1 right-2 w-8 h-8 p-1 flex items-center justify-center rounded-full bg-red-600"
                                >
                                  <BaseText className="text-white">X</BaseText>
                                </Pressable>
                                <ProductDetailsVariations
                                    variations={product?.variations}
                                    product_image={product?.product_image}
                                    handleAddToCart={handleAddToCart}
                                />
                            </View>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </View>
            )}
        </>
    )
}

export default ProductDetailsScreen