import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import useAxios from 'axios-hooks';
import { useEffect } from "react";
import ButtomSubmit from "../components/buttomSubmit/buttomSubmit";

export default function FormularioScreen() {

    const [{ data, loading, error }, refetch] = useAxios(
        'http://192.168.0.166:3000/product/getCategory',
        { manual: true }
    )

    useEffect(() => {
        refetch({ data: { delay: 2 } })
        console.log(data)
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
        <SafeAreaView className="flex-1 bg-[#fff]">
            <ScrollView className="p-5">
                <View className="mb-1 mt-4 w-full">
                    <Text className="mb-2">Nome:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-[100%] border border-gray-300 rounded-md py-5 p-2 bg-[#fff]  "
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
                    {errors.name && <Text>This is required.</Text>}
                </View>
                <View className="mb-1 mt-4 w-full">
                    <Text className="mb-2">Preço:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-[100%] border border-gray-300 rounded-md py-5 p-2 bg-[#fff]  "
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
                    {errors.price && <Text>This is required.</Text>}
                </View>
                <View className="mb-1 mt-4 w-full">
                    <Text className="mb-2">Categoria:</Text>
                    <View className=" bg-[#fff] border border-gray-300 rounded-md">
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
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
                        {errors.category && <Text>This is required.</Text>}
                        {
                            loading && <ActivityIndicator className="absolute top-[30%] right-[10%]" />
                        }
                    </View>
                </View>
                <View className="mb-1 mt-4 w-full">
                    <Text className="mb-2">Quantidade:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-[100%] border border-gray-300 rounded-md py-5 p-2 bg-[#fff]  "
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
                    {errors.quantity && <Text>This is required.</Text>}
                </View>
                <View className="mb-1 mt-4 w-full">
                    <Text className="mb-2">Descrição:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                numberOfLines={100}
                                className="w-[100%] h-[200px] border border-gray-300 rounded-md py-5 p-2 bg-[#fff]  "
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
                    {errors.description && <Text>This is required.</Text>}
                </View>
                <TouchableOpacity
                    className="mb-1 mt-4 w-full bg-white border border-black rounded-md py-5 p-2">
                    <Text>Arquivo (xml)</Text>
                </TouchableOpacity>
                <ButtomSubmit handleSubmit={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}