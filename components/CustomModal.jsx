import {Button, Modal, Text, View} from "react-native";
import React from "react"

const CustomModal = ({
  showModal,
  handleClose,
  children,
  animation = "slide"
}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Modal
                animationType={animation}
                transparent={true}
                visible={showModal}
                onRequestClose={handleClose}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                   <View className="w-[90%] bg-white rounded px-3 py-2">
                       {children}
                   </View>
                </View>
            </Modal>
        </View>
    )
}

export default React.memo(CustomModal)