import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const HomeBanner = ({medias}) => {
    const width = Dimensions.get('window').width;
    return (
        <GestureHandlerRootView className="h-[180px] w-full bg-white mt-2 px-3 py-2">
            <Carousel
                loop
                width={width * 0.94}
                height="100%"
                autoPlay={true}
                data={medias}
                autoPlayInterval={3000}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (
                    <View className="w-full h-full rounded">
                        <Image
                            source={{ uri: medias[index].media_url}}
                            className="w-full h-full object-contain rounded"
                        />
                    </View>
                )}
            />
        </GestureHandlerRootView>
    );
}

export default React.memo(HomeBanner)
