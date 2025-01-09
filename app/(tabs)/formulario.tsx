import { ActivityIndicator, TextInput, Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import useAxios from 'axios-hooks';
import { useEffect, useState } from "react";
import ButtomSubmit from "../components/buttomSubmit/buttomSubmit";
import XmlFilePicker from "../components/fileInput/fileInput";
import ToastManager from "toastify-react-native";
import BackButton from "../components/backButton/backButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

export default function FormularioScreen() {

    const [{ data, loading, error }, refetch] = useAxios(
        'http://192.168.0.166:3000/product/getCategory',
        { manual: true }
    )

    const [xmlForm, setXmlForm] = useState<boolean>(false);

    useEffect(() => {
        refetch({ data: { delay: 2 } })
    }, [])

    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors } } = useForm({
            defaultValues: {
                name: '',
                price: '',
                category: '',
                description: '',
                quantity: '',
            }
        });


    return (
        <SafeAreaView className=" bg-[#fff]">
            <ToastManager
                width={width - 50}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                duration={2000}
            />
            <BackButton />
            <ScrollView
                className="p-5 ">
                <View
                    className="w-full h-[60px] mb-6 "
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <View className="w-full h-full flex-row overflow-hidden border-[.9px] border-[#8298ab] rounded-lg">
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                            <AntDesign name="user" size={24} color="white" />
                        </View>
                        <View className="w-[85%] h-[100%]">
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Nome do produto"
                                        placeholderTextColor={"#d1d1d1"}
                                        style={{ height: "100%" }}
                                        className=" w-full "
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="name"
                                rules={{ required: true }}
                            />
                        </View>
                    </View>
                    <Text
                        style={{ opacity: errors.name && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    className="w-full h-[60px] mb-6 "
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <View className="w-full h-full flex-row overflow-hidden border-[.9px] border-[#8298ab] rounded-lg">
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px] border-[#8298ab]">
                            <MaterialIcons name="attach-money" size={24} color="white" />
                        </View>
                        <View className="w-[85%] h-[100%]">
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Preço"
                                        placeholderTextColor={"#d1d1d1"}
                                        style={{ height: "100%" }}
                                        className=" w-full "
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="price"
                                rules={{ required: true }}
                            />
                        </View>
                    </View>
                    <Text
                        style={{ opacity: errors.price && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        Campo precisa ser preenchido.
                    </Text>
                </View>
                <View className="w-full h-[60px] mb-6 ">
                    <View
                        className="w-full flex flex-row justify-center items-center h-[60px] border-[.9px] border-[#8298ab] overflow-hidden rounded-lg"
                        style={{ opacity: xmlForm ? 0.2 : 1 }}
                        pointerEvents={xmlForm ? "none" : "auto"}
                    >
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row  justify-center items-center border-r-[.9px] border-[#8298ab]">
                            <MaterialCommunityIcons name="medical-bag" size={24} color="white" />
                        </View>
                        <View className="w-[85%] h-full">
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: "100%" }}
                                        className=" w-full"
                                        selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
                                        <Picker.Item label="Selecione..." value="" style={{ color: "#d1d1d1" }} />
                                        {
                                            data?.data.map((item: string, index: number) => {
                                                return (
                                                    <Picker.Item key={index} label={item} value={item} />
                                                )
                                            })
                                        }
                                    </Picker>
                                )}
                                name="category"
                                rules={{ required: true }}
                            />
                            {
                                loading && <ActivityIndicator
                                    className="absolute top-[30%] right-[10%]"
                                />
                            }
                        </View>
                    </View>
                    <Text
                        style={{ opacity: errors.category && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        Campo precisa ser preenchido.
                    </Text>
                </View>

                <View
                    className="w-full h-[60px] mb-6  "
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <View className="w-full h-full flex-row overflow-hidden border-[.9px] border-[#8298ab] rounded-lg">
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                            <FontAwesome6 name="box-open" size={20} color="white" />
                        </View>
                        <View className="w-[85%] h-[100%]">
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Quantidade"
                                        placeholderTextColor={"#d1d1d1"}
                                        style={{ height: "100%" }}
                                        className=" w-full "
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="quantity"
                                rules={{ required: true }}
                            />
                        </View>
                    </View>
                    <Text
                        style={{ opacity: errors.quantity && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    className="w-full"
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Descrição"
                                placeholderTextColor={"#d1d1d1"}
                                multiline
                                numberOfLines={100}
                                className="w-[100%] h-[120px] border-[.9px] border-[#8298ab] rounded-[2px] py-5 p-2 bg-[#fff]  "
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="description"
                        rules={{ required: true }}
                    />
                    <Text
                        style={{ opacity: errors.description && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-sm">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    style={{ marginBottom: height / 5 }}
                    className="mt-4 w-full">
                    <XmlFilePicker setXmlForm={setXmlForm} reset={reset} />
                    {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} />}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}