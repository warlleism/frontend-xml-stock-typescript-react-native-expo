import { Dimensions, ScrollView, Text, TouchableOpacity, View, Animated } from "react-native";
import FormularioScreen from "../components/forms/stock_form";
import BackButton from "../components/backButton/backButton";
import { useState, useRef } from "react";
import ActiveFormScreen from "../components/forms/actives_form";
import CategoryFormScreen from "../components/forms/category_form";
const { width } = Dimensions.get('window');

export default function Formularios() {

    const [selectedTab, setSelectedTab] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const slideAnimation = useRef(new Animated.Value(0)).current;

    const handleTabPress = (index: number) => {
        setSelectedTab(index);
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    return (
        <View className="flex-1 w-full bg-[#fff]">
            <BackButton />
            <View className="w-full flex-row justify-center items-center mb-10">
                <View className="relative w-[90%]">
                    <View className="flex-row">
                        <TouchableOpacity
                            className="w-[33%] justify-center items-center py-2"
                            onPress={() => handleTabPress(0)}>
                            <Text className={`text-sm ${selectedTab === 0 ? 'text-[#00A995]' : 'text-[#94a3b8]'}`}>Estoque</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-[33%] justify-center items-center py-2"
                            onPress={() => handleTabPress(1)}>
                            <Text className={`text-sm ${selectedTab === 1 ? 'text-[#00A995]' : 'text-[#94a3b8]'}`}>Categoria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-[33%] justify-center items-center py-2"
                            onPress={() => handleTabPress(2)}>
                            <Text className={`text-sm ${selectedTab === 2 ? 'text-[#00A995]' : 'text-[#94a3b8]'}`}>Principios Ativos</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        className="absolute bottom-0 h-[1px] w-[33%] bg-[#00A995]"
                        style={{ transform: [{ translateX: slideAnimation }] }}
                    />
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1, width: '100%' }}
                className="flex-1 w-full"
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={(e) => {
                    const offset = e.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / width);
                    setSelectedTab(index);
                    Animated.spring(slideAnimation, {
                        toValue: index * (width * 0.3),
                        useNativeDriver: true,
                        speed: 15,
                        bounciness: 0,
                    }).start();
                }}>
                <FormularioScreen />
                <CategoryFormScreen />
                <ActiveFormScreen />
            </ScrollView>
        </View>
    )
}