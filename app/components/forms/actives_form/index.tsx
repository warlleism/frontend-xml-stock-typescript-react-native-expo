import { TextInput, Dimensions, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import ToastManager from "toastify-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FormContainer from "../../formContainer/formContainer";
import { useState } from "react";
const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    bula: z.string().min(1, "Bula é obrigatória"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function ActiveFormScreen() {

    const [xmlForm, setXmlForm] = useState<boolean>(false);

    const { register, setValue, handleSubmit, control, reset,
        formState: { errors } } = useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                name: "",
                bula: "",
            },
        });

    return (
        <SafeAreaView
            className="px-5"
            style={{ width: width, height: height - 200 }}
        >
            <ToastManager
                width={width - 50}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                duration={2000}
            />
            <View>
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
                                            placeholder="Nome do princípio ativo"
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
                <View className="mb-1"
                    style={{ opacity: xmlForm ? 0.2 : 1 }}
                    pointerEvents={xmlForm ? "none" : "auto"}
                >
                    <View className="mb-1">
                        <View className="flex-row overflow-hidden rounded-md border-[#8298ab] border-[.9px] h-[120px]">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center">
                                <AntDesign name="user" size={24} color="white" />
                            </View>
                            <Controller
                                control={control}
                                name="bula"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        {...register("bula")}
                                        placeholder="Bula do princípio ativo"
                                        placeholderTextColor={"#d1d1d1"}
                                        multiline
                                        numberOfLines={100}
                                        className="w-[100%] h-[100%]"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        <Text
                            style={{ opacity: errors.bula && xmlForm == false ? 1 : 0 }}
                            className="text-[#616161] text-[10px]">
                            {errors.bula?.message !== "Required" ? errors.bula?.message : "Preencha a descrição da bula"}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                className="w-full absolute bottom-0 self-center">
                <XmlFilePicker setXmlForm={setXmlForm} reset={reset} url="http://192.168.0.166:3000/active/create" />
                {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} url="http://192.168.0.166:3000/active/create" />}
            </View>
        </SafeAreaView >
    );
}