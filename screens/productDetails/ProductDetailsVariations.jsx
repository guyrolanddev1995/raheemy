import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import SalePrice from "../../components/product/SalePrice";
import Price from "../../components/product/Price";
import ProductDetailsVariableCard from "./ProductDetailsVariableCard";
import BaseText from "../../components/BaseText";
import {ucFirst} from "../../Utils";
import {Feather} from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";

const ProductDetailsVariations = ({variations, product_image, handleAddToCart}) => {
    const [variationSelected, setVariationSelected] = useState(variations[0])
    const [variationsByAttribute, setVariationsByAttribute] = useState({});
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const {width} = useWindowDimensions()

    const [quantity, setQuantity] = useState(1)

    const increment = () => {
        if(quantity >= variationSelected.quantite) {
            setQuantity(variationSelected.quantite)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const decrement = () => {
        if(quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity((quantity) => quantity - 1)
        }
    }

    const addToCart = () => {
        handleAddToCart({
            quantity,
            data: variationSelected,
            type: "variation"
        })
    }

    const organizeVariationsByAttribute = () => {
        const newVariationsByAttribute = {};
        variations.forEach((variation) => {
            Object.entries(variation.attributes).forEach(([attributeName, attributeValue]) => {
                if (!newVariationsByAttribute[attributeName]) {
                    newVariationsByAttribute[attributeName] = [];
                }
                const isAttributeValueUnique = !newVariationsByAttribute[attributeName].some((obj) => obj.value === attributeValue.value);
                if (isAttributeValueUnique) {
                    newVariationsByAttribute[attributeName].push(attributeValue);
                }
            });
        });

        setVariationsByAttribute(newVariationsByAttribute);
    };

    const selectAttributeValue = useCallback((attribute, value) => {
        setSelectedAttributes(prevSelectedAttributes => ({
            ...prevSelectedAttributes,
            [attribute]: { ...value }
        }));

        return searchSelectedVariation({ [attribute]: { ...value } });
    }, []);

    const searchSelectedVariation = useCallback((selectedAttributeParams) => {
        const result = variations.find((variation) => {
            return Object.entries(selectedAttributeParams).every(([attributeName, attributeValue]) => {
                const attributeValues = variation.attributes ? Object.entries(variation.attributes) : [];
                return attributeValues.find(([key, attr]) => {
                    return key === attributeName && attr.id === attributeValue.id;
                });
            });
        });
        if (!result) {
            setVariationSelected(variations[0]);
            return false;
        }
        setVariationSelected(result);
    }, []);

    useEffect(() => {
        organizeVariationsByAttribute();
    }, []);

    return (
       <View className="flex-1">
          <View
              className="w-full justify-center items-center"
              style={{maxHeight: 370, height: 360}}
          >
              {variationSelected && variationSelected.gallerie.length > 0  ? (
                  <FlatList
                      data={variationSelected.gallerie}
                      horizontal
                      pagingEnabled
                      contentContainerStyle={{
                          backgroundColor: "white",
                      }}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                          <Image
                              source={{uri: item.url}}
                              style={{
                                  width: width,
                                  aspectRatio: 1
                              }}
                              resizeMode="stretch"
                          />
                      )}
                      keyExtractor={item => item.uid}
                  />
              ) : (
                  <Image
                      source={{uri: product_image}}
                      style={{
                          width: "80%",
                          aspectRatio: 1,
                      }}
                  />
              )}

          </View>
           <View className="mt-1 mx-3">
               {variationSelected && variationSelected?.prix_promo ? (
                   <SalePrice
                       price={variationSelected?.prix}
                       sale_price={variationSelected?.prix_promo}
                       reduction={variationSelected?.pourcentage_reduction}
                       priceStyles="text-red-600 text-[20px] text-left font-[700]"
                       oldPriceStyle="text-gray-800 font-light text-[14px]"
                       direction="row"
                   />
               ) : (
                    <Price price={variationSelected?.prix} size="text-[20px]" weight="font-[700]"/>
               )}

               <View className="mb-1">
                   <BaseText className="text-[12px]">{`${variationSelected?.quantite} article(s) disponible(s)`}</BaseText>
               </View>

               {variations.length > 0 && (
                   <ProductDetailsVariableCard
                       variations={variations}
                       variationSelected={variationSelected}
                       showTitle={false}
                       height="h-11"
                       width="w-11"
                   />
               )}
           </View>

           <ScrollView showsVerticalScrollIndicator={false} className="px-3 pb-2 border-t border-slate-100">
               <View className="py-5">
                   {Object.entries(variationsByAttribute).map(([attribute, attributeValues]) => (
                       <View className="mb-4" key={attribute}>
                           <View className="w-full flex-row">
                               <BaseText className="text-[15px] font-bold">{ucFirst(attribute)}</BaseText>

                               {variationSelected !== null &&
                                   <BaseText className="text-[15px] font-bold">{ ': ' + ucFirst(variationSelected.attributes[attribute]?.value)}</BaseText>
                               }
                           </View>

                           <View className="flex-row mt-3 space-x-3.5">
                               {attributeValues.map(value => (
                                   <Pressable
                                       onPress={() => selectAttributeValue(attribute, value)}
                                       key={value.id}
                                       className={`
                                           bg-gray-100 rounded py-1 px-2 text-center
                                       `}
                                   >
                                       <BaseText className="text-[13px] font-semibold">{ucFirst(value.value)}</BaseText>
                                   </Pressable>
                               ))}
                           </View>
                       </View>
                   ))}
               </View>
           </ScrollView>

           <View
               className={`
               flex-row items-center px-3 w-full pt-2 border-t border-slate-50 shadow-xs space-x-8
               ${Platform.OS === 'ios' ? 'pb-7' : 'pb-2'}
            `}
           >
               <View className="flex-row items-center space-x-4">
                   <Pressable
                       className="items-center justify-center bg-gray-100 w-6 h-6 rounded-full"
                       onPress={decrement}
                   >
                       <BaseText className="text-[17px]">-</BaseText>
                   </Pressable>

                   <BaseText className="text-[17px]">{quantity}</BaseText>

                   <Pressable
                       className="items-center justify-center bg-gray-100 w-6 h-6 rounded-full"
                       onPress={increment}
                   >
                       <BaseText className="text-[16px]">+</BaseText>
                   </Pressable>
               </View>
               <View className="flex-row flex-1">
                   <CustomButton
                       onPress={addToCart}
                       className="bg-red-600 px-2 py-2.5 flex flex-row space-x-3 items-center justify-center rounded-full"
                   >
                       <BaseText className="text-white text-[16px] w-full text-center">Ajouter au panier</BaseText>
                   </CustomButton>
               </View>
           </View>
       </View>
    );
}

export default React.memo(ProductDetailsVariations)
