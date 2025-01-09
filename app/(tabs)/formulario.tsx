import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import useAxios from 'axios-hooks';
import { useEffect, useState } from "react";
import ButtomSubmit from "../components/buttomSubmit/buttomSubmit";
import XmlFilePicker from "../components/fileInput/fileInput";
import axios from "axios";

export default function FormularioScreen() {

    const [{ data, loading, error }, refetch] = useAxios(
        'http://192.168.0.166:3000/product/getCategory',
        { manual: true }
    )

    const [xmlContent, setXmlContent] = useState<any>();

    const sendFile = async () => {

        try {


            if (!xmlContent) {
                alert("Por favor, selecione um arquivo.");
                return;
            }

            const apiUrl = "http://192.168.0.166:3000/product/create"
            const formData = new FormData();
            const file = xmlContent[0];

            const xmlFile = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size
            };

            formData.append("file", xmlFile as any);

            const { data } = await axios.post(apiUrl, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Resposta do servidor:", data);

        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
        }

    };

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
        <SafeAreaView>
            <ScrollView
                className="p-5 bg-[#fff]">
                <View className="mb-1 mt-4 w-full" >
                    <XmlFilePicker setXmlContent={setXmlContent} xmlContent={xmlContent} />
                </View>
                <View
                    className="mb-1 mt-4 w-full"
                    pointerEvents={xmlContent ? "none" : "auto"}
                    style={{ opacity: xmlContent ? 0.2 : 1 }}>
                    <Text className="mb-2">Nome:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput

                                className="w-[100%] border border-[#222222] rounded-md py-5 p-2 bg-[#fff]  "
                                placeholder="Ibuprofeno 400mg"
                                placeholderTextColor={'#e6e6e6'}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="name"
                        rules={{ required: true }}
                    />
                    {errors.name && xmlContent == null && <Text className="text-[#616161] text-sm font-">Campo precisa ser preenchido.</Text>}
                </View>
                <View
                    className="mb-1 mt-4 w-full"
                    pointerEvents={xmlContent ? "none" : "auto"}
                    style={{ opacity: xmlContent ? 0.2 : 1 }}>
                    <Text className="mb-2">Preço:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-[100%] border border-[#222222] rounded-md py-5 p-2 bg-[#fff]  "
                                placeholder="Preço"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                placeholderTextColor={'#e6e6e6'}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="price"
                        rules={{ required: true }}
                    />
                    {errors.price && xmlContent == null && <Text className="text-[#616161] text-sm font-">Campo precisa ser preenchido.</Text>}
                </View>
                <View
                    className="mb-1 mt-4 w-full"
                    style={{ opacity: xmlContent ? 0.2 : 1 }}
                    pointerEvents={xmlContent ? "none" : "auto"}>
                    <Text className="mb-2">Categoria:</Text>
                    <View className=" bg-[#fff] border border-[#222222] rounded-md">
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
                            loading && <ActivityIndicator className="absolute top-[30%] right-[10%]" />
                        }
                    </View>
                </View>
                {errors.category && xmlContent == null && <Text className="text-[#616161] text-sm font-">Campo precisa ser preenchido.</Text>}
                <View
                    className="mb-1 mt-4 w-full"
                    pointerEvents={xmlContent ? "none" : "auto"}
                    style={{ opacity: xmlContent ? 0.2 : 1 }}>
                    <Text className="mb-2">Quantidade:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-[100%] border border-[#222222] rounded-md py-5 p-2 bg-[#fff]  "
                                placeholder="Quantidade"
                                onBlur={onBlur}
                                placeholderTextColor={'#e6e6e6'}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="quantity"
                        rules={{ required: true }}
                    />
                    {errors.quantity && xmlContent == null && <Text className="text-[#616161] text-sm font-">Campo precisa ser preenchido.</Text>}
                </View>
                <View
                    className="mb-1 mt-4 w-full"
                    pointerEvents={xmlContent ? "none" : "auto"}
                    style={{ opacity: xmlContent ? 0.2 : 1 }}>
                    <Text className="mb-2">Descrição:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                numberOfLines={100}
                                className="w-[100%] h-[120px] border border-[#222222] rounded-md py-5 p-2 bg-[#fff]  "
                                placeholder="Descrição"
                                onBlur={onBlur}
                                placeholderTextColor={'#e6e6e6'}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="description"
                        rules={{ required: true }}
                    />
                    {errors.description && xmlContent == null && <Text className="text-[#616161] text-sm font-">Campo precisa ser preenchido.</Text>}
                </View>
                <View className="mb-[140px] mt-4 w-full">
                    <TouchableOpacity className="mb-1 mt-4 w-full bg-black rounded-md py-8 p-2" onPress={sendFile}>
                        <Text className="text-white text-center text-xl">Enviar (.xml)</Text>
                    </TouchableOpacity>
                    <ButtomSubmit handleSubmit={handleSubmit} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}