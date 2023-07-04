import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Price from "../../components/product/Price";
import BaseText from "../../components/BaseText";

const ProductVariationsPrices = React.memo(
    ({ product}) => {
      const [minPrice, setMinPrice] = useState(0)
      const [maxPrice, setMaxPrice] = useState(0)

      const productVariablePrices = () => {
        if (product.product_type === "variable" && product.variations.length !== 0) {
          const uniquePrice = product.variations[0].prix;
          const allSomePrice = product.variations.every(item => item.prix === uniquePrice);

          if (allSomePrice) {
            setMinPrice(uniquePrice)
            setMaxPrice(uniquePrice)
          } else {
            const { minPrice: min, maxPrice: max } = product.variations.reduce(
                (acc, produit) => {
                  if (produit.prix < acc.minPrice) acc.minPrice = produit.prix;
                  if (produit.prix > acc.maxPrice) acc.maxPrice = produit.prix;

                  return acc;
                },
                { minPrice: Number.MAX_VALUE, maxPrice: Number.MIN_VALUE }
            );

            setMinPrice(min); setMaxPrice(max)
          }
        }

      };

      useEffect(() => {
        productVariablePrices()

      }, [product])

      return (
          <View className="flex-row items-center w-full mt-3">
            {minPrice == maxPrice ? (
                <Price price={minPrice} size="text-[20px]" weight="font-[700]"/>
            ): (
                <>
                  <Price price={minPrice} size="text-[20px]" weight="font-[700]"/>
                  <BaseText classNa> - </BaseText>
                  <Price price={maxPrice} size="text-[20px]" weight="font-[700]"/>
                </>
            )}
          </View>
      )
    }
)

export default React.memo(ProductVariationsPrices);
