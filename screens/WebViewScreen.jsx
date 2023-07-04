import { useEffect, useLayoutEffect, useState } from "react";
import {Linking, Platform, SafeAreaView} from "react-native";
import { WebView } from "react-native-webview";
import axiosInstance from "../services/axios";
import ModalLoading from "../components/ModalLoading";

const WebViewScreen = ({ navigation, route }) => {
  const mode_paiement = route.params.mode_paiement;
  const reference = route.params.reference;

  const [url, setUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const initTransaction = async () => {
    try {
      const data = {
        order_code: reference,
        channel: mode_paiement === "bank-cart" ? "CARD" : "",
      };

      const response = await axiosInstance.post("/transactions/init", data);

      if (response.data.code === 200) {
        let result = setUrl(response.data.url);
        console.log(result);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const handleWebViewNavigationStateChange = async(newState) => {
      const {url} = newState

      if(Platform.OS === "android") {
         if(url.startsWith("wave://capture/https://")) {
           const splitArray = url.split("https://"); // Divise la chaîne en utilisant "https://" comme séparateur
           const remainingUrl = "https://" + splitArray[1]; // Partie après "https://"

           await Linking.openURL(remainingUrl)

           newState.close()
         }
      }
  }

  useEffect(() => {
    initTransaction();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {isLoading && (
          <ModalLoading showTitle={false}/>
      )}

      {url && <WebView
          className="flex-1"
          originWhitelist={["*"]}
          source={{ uri:  url}}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
      />}
    </SafeAreaView>
  );
};

export default WebViewScreen;
