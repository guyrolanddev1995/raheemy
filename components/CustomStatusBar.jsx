import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {STATUSBAR_HEIGHT} from "../commons/Fonts";

const CustomStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
          </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})

export default CustomStatusBar;

