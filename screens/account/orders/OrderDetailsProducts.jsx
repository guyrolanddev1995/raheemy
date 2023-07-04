import React from 'react';
import {Image, Text, View} from 'react-native';
import BaseText from "../../../components/BaseText";
import {currencyFormat} from "../../../Utils";
import OrderDetailsProductItem from "./OrderDetailsProductItem";

const OrderDetailsProducts = ({products}) => {
  return (
      <>
          {products && products.length > 0 &&
              <View className="w-full mb-1 items-start justify-start bg-white px-2 rounded relative">
                {products.map((product, index) => {
                    let key = product.pivot.product_type === "variable"
                        ? product.pivot.variation_id
                        : product.id
                    return <OrderDetailsProductItem key={key} product={product}/>
                })}
              </View>
          }
      </>
  );
}

export default React.memo(OrderDetailsProducts);
