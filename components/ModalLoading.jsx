import React from 'react';
import {Text, View} from 'react-native';
import Spinner from "./Spinner";
import BaseText from "./BaseText";

const ModalLoading = ({title = null, showTitle = false}) => {
    return (
       <View
           className="flex-1 justify-center w-full h-full absolute top-0 left-0 bg-black/50"
           style={{
               zIndex: 999999
           }}
       >
           <View clasName="flex-col justify-center w-full">
               <Spinner color="white" size={40} fullSize={false}/>
               {showTitle && title && <BaseText className="text-white text-[17px] mt-10 text-center">{title}</BaseText>}
           </View>
       </View>
    );
}

export default ModalLoading;
