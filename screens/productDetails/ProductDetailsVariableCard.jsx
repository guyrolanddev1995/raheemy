import React from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import BaseText from "../../components/BaseText";
import {ucFirst} from "../../Utils";

const ProductDetailsVariableCard = ({
  variations,
  variationSelected,
  openBottomSheet,
  showTitle = true,
  height = "h-14",
  width = "w-14"
}) => {

    return (
      <>
          <View className="border-slate-100 py-1.5">
              {variationSelected && <>
                  {showTitle && <View className="flex-row mb-5">
                      {Object.entries(variationSelected.attributes).map(([attribute, attributeValue]) => (
                          <BaseText key={attribute} className="text-[16px] font-bold">
                              {`${ucFirst(attribute)}: ${ucFirst(attributeValue.value)}; `}
                          </BaseText>
                      ))}
                  </View>}
              </>}

              <ScrollView
                  className="flex-row"
                  horizontal
                  showsHorizontalScrollIndicator={false}
              >
                  {variations.map((variation, index) => (
                     <View key={variation.id}>
                         {
                             variation.gallerie?.length > 0 && <Pressable
                                 onPress={openBottomSheet}
                                 className={`
                                  ${height} ${width} mr-3
                                  ${variation.id === variationSelected?.id ? "rounded border-2 border-red-500" : ''}
                            `}
                         >
                             <View className="w-full h-full justify-center items-center">
                                 <Image
                                     source={{uri: variation.gallerie[0].url}}
                                     className="w-full h-full rounded"
                                 />
                             </View>
                         </Pressable>
                         }
                     </View>
                  )) }
              </ScrollView>
          </View>
      </>
    )
}

export default React.memo(ProductDetailsVariableCard)
