import {Pressable} from "react-native";
import BaseText from "./BaseText";
import {useNavigation} from "@react-navigation/native";

const SearchBar = () => {
    const navigation = useNavigation()

    return (
        <Pressable
            className="bg-gray-200 flex-1 justify-center px-4 h-10 rounded-full"
            onPress={() => navigation.navigate('Search')}
        >
            <BaseText numberOfLines={1}>Rechercher un produit, une categorie</BaseText>
        </Pressable>
    )
}

export default SearchBar