import { TextInput, Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FormContainer from "../../formContainer/formContainer";
import { useState } from "react";
const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
    description: z.string().min(1, "description é obrigatória"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function CategoryFormScreen() {

    const [xmlForm, setXmlForm] = useState<boolean>(false);

    const { register, setValue, handleSubmit, control, reset,
        formState: { errors } } = useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                name: "",
                description: "",
            },
        });

    return (
        <SafeAreaView
            className="px-5"
            style={{ width: width, height: height - 200 }}
        >
            <View style={{ height: height - 60 }}>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-full h-full flex-row overflow-hidden">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                                <AntDesign name="user" size={24} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("name")}
                                            placeholder="Nome da categoria"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className=" w-full "
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.name && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.name?.message !== "Required" ? errors.name?.message : "Preencha o nome do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-full h-full flex-row overflow-hidden">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                                <AntDesign name="user" size={24} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="description"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("description")}
                                            placeholder="Descrição da categoria"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className=" w-full "
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.name && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.description?.message !== "Required" ? errors.description?.message : "Preencha o nome do produto"}
                    </Text>
                </View>
            </View>
            <View
                className="w-full absolute bottom-0 self-center">
                <XmlFilePicker setXmlForm={setXmlForm} reset={reset} url="http://192.168.0.166:3000/category/create" />
                {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} url="http://192.168.0.166:3000/category/create" />}
            </View>
        </SafeAreaView >
    );
}