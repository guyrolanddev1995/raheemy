import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback} from 'react-native';

const Dismisskeyboard = ({children}) => {
  return (
      <TouchableWithoutFeedback
        onPress={() => {Keyboard.dismiss()}}
      >
        {children}
      </TouchableWithoutFeedback>
  );
}

export default Dismisskeyboard;
