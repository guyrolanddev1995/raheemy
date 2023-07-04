import React from 'react';
import {Platform, View} from 'react-native';
const BottomBar = ({children}) => {
    return (
        <View
            className={`
               flex-row items-center justify-between  px-3 w-full bg-white pt-3 border-t border-slate-50 shadow-xs space-x-8
               ${Platform.OS === 'ios' ? 'pb-7' : 'pb-3'}
            `}
        >
            {children}
        </View>
    )
}

export default BottomBar;
