import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormularioScreen from "../components/forms/stock_form";
import BackButton from "../components/backButton/backButton";
import { useState, useRef } from "react";
import ActiveFormScreen from "../components/forms/actives_form";
import CategoryFormScreen from "../components/forms/category_form";
import ToastManager from "toastify-react-native";
const { width } = Dimensions.get('window');

export default function Formularios() {

    const [selectedTab, setSelectedTab] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const handleTabPress = (index: number) => {
        setSelectedTab(index);
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    return (
        <View className="flex-1 w-full bg-[#fff]">
            <ToastManager
                width={width - 50}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                duration={2000}
            />
            <BackButton />
            <View className="w-full flex-row gap-2 items-center p-4">
                <TouchableOpacity
                    className={`rounded-xl p-2 ${selectedTab === 0 ? 'bg-[#2196f3]' : 'bg-[#e8f1f5]'}`}
                    onPress={() => handleTabPress(0)}>
                    <Text className={`${selectedTab === 0 ? 'text-white' : 'text-[#000]'}`}>Estoque</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`rounded-xl p-2 ${selectedTab === 1 ? 'bg-[#2196f3]' : 'bg-[#e8f1f5]'}`}
                    onPress={() => handleTabPress(1)}>
                    <Text className={`${selectedTab === 1 ? 'text-white' : 'text-[#000]'}`}>Categoria</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`rounded-xl p-2 ${selectedTab === 2 ? 'bg-[#2196f3]' : 'bg-[#e8f1f5]'}`}
                    onPress={() => handleTabPress(2)}>
                    <Text className={`${selectedTab === 2 ? 'text-white' : 'text-[#000]'}`}>Principios Ativos</Text>
                </TouchableOpacity>
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
                }}>
                <FormularioScreen />
                <CategoryFormScreen />
                <ActiveFormScreen />
            </ScrollView>
        </View>
    )
}