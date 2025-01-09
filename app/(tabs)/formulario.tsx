import { ActivityIndicator, Dimensions, ScrollView, Text, View } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import useAxios from 'axios-hooks';
import { useEffect, useState } from "react";
import ButtomSubmit from "../components/buttomSubmit/buttomSubmit";
import XmlFilePicker from "../components/fileInput/fileInput";
import ToastManager from "toastify-react-native";
import BackButton from "../components/backButton/backButton";

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
                    className=" w-full"
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                color="#212121"
                                label="Nome"
                                className="w-[100%] border border-[#9e9e9e] rounded-[2px] py-5 p-2 bg-[#fff]"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="name"
                        rules={{ required: true }}
                    />
                    <Text
                        style={{ opacity: errors.name && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    className="mb-1 mt-2 w-full"
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                color="#212121"
                                label="Preço"
                                className="w-[100%] border border-[#9e9e9e] rounded-[2px] py-5 p-2 bg-[#fff]"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="price"
                        rules={{ required: true }}
                    />
                    <Text
                        style={{ opacity: errors.price && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    className="mb-1 mt-2 w-full"
                    style={{ opacity: xmlForm ? 0.2 : 1 }}
                    pointerEvents={xmlForm ? "none" : "auto"}>
                    <View className=" bg-[#fff] border border-[#9e9e9e] rounded-[2px]">
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    mode="dropdown"
                                    className="w-[100%] h-[100%]"
                                    selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
                                    <Picker.Item label="Selecione..." value="" />
                                    {
                                        data?.data.map((item: string, index: number) => {
                                            return <Picker.Item key={index} label={item} value={item} />
                                        })
                                    }
                                </Picker>
                            )}
                            name="category"
                            rules={{ required: true }}
                        />
                        {
                            loading && <ActivityIndicator
                                color={"#000"}
                                className="absolute top-[30%] right-[10%]"
                            />
                        }
                    </View>
                </View>
                <Text
                    style={{ opacity: errors.category && xmlForm == false ? 1 : 0 }}
                    className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                <View
                    className="mb-1 mt-2 w-full"
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                color="#212121"
                                label="Quantidade"
                                keyboardType="numeric"
                                className="w-[100%] border border-[#9e9e9e] rounded-[2px] py-5 p-2 bg-[#fff]"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="quantity"
                        rules={{ required: true }}
                    />
                    <Text
                        style={{ opacity: errors.quantity && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">Campo precisa ser preenchido.</Text>
                </View>
                <View
                    className="mb-1 mt-2 w-full"
                    pointerEvents={xmlForm ? "none" : "auto"}
                    style={{ opacity: xmlForm ? 0.2 : 1 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                color="#212121"
                                label="Descrição"
                                multiline
                                numberOfLines={100}
                                className="w-[100%] h-[120px] border border-[#9e9e9e] rounded-[2px] py-5 p-2 bg-[#fff]  "
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