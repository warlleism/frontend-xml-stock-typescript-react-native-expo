import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export default function BackButton() {

    const router = useRouter();
    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} >
                <Feather name="arrow-left" size={30} color={"#000"} />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-black ">Formulario</Text>
            <View className="w-10 h-10" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        width: "100%",
        alignSelf: "center",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    }

})