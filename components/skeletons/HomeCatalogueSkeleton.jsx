import React from 'react';
import {Text, View} from 'react-native';
import CircleSkeleton from "./CircleSkeleton";
import SquareSkeleton from "./SquareSkeleton";
import LineSkeleton from "./LineSkeleton";

const HomeCatalogueSkeleton = () => {

    return (
        <View className="flex-1 py-2">
           <View className="w-full">
               <SquareSkeleton
                 width={"100%"}
                 height={200}
               />
           </View>

            <View className="flex-row mt-3 space-x-5 w-full">
                <View>
                    <SquareSkeleton
                        width={80}
                        height={80}
                    />
                </View>
                <View>
                    <SquareSkeleton
                        width={80}
                        height={80}
                    />
                </View>
                <View>
                    <SquareSkeleton
                        width={80}
                        height={80}
                    />
                </View>
                <View>
                    <SquareSkeleton
                        width={80}
                        height={80}
                    />
                </View>
            </View>

            <View className="mt-5">
                <LineSkeleton
                    width={300}
                    height={5}
                />

                <View className="flex-row flex-wrap pt-4 gap-x-1 gap-y-10 w-full">
                    <View className="w-[50%]">
                        <SquareSkeleton
                            width={"100%"}
                            height={150}
                        />
                        <LineSkeleton
                            width={140}
                            height={6}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                    </View>
                    <View className="w-[47%]">
                        <SquareSkeleton
                            width={"100%"}
                            height={150}
                        />
                        <LineSkeleton
                            width={150}
                            height={6}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                    </View>
                    <View className="w-[50%]">
                        <SquareSkeleton
                            width={"100%"}
                            height={150}
                        />
                        <LineSkeleton
                            width={150}
                            height={6}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                    </View>
                    <View className="w-[47%]">
                        <SquareSkeleton
                            width={"100%"}
                            height={150}
                        />
                        <LineSkeleton
                            width={150}
                            height={6}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                        <LineSkeleton
                            width={170}
                            height={5}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default React.memo(HomeCatalogueSkeleton);
