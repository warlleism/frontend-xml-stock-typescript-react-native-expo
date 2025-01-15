import { ActivityIndicator, TextInput, Dimensions, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import ToastManager from "toastify-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import useGetCategory from "../../../hooks/useGetCategory";
import FormContainer from "../../formContainer/formContainer";
const { width, height } = Dimensions.get('window');


const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    price: z.number().min(1, "Preço é obrigatório"),
    category: z.number().min(1, "Categoria é obrigatória"),
    description: z.string().min(1, "Descrição é obrigatória"),
    quantity: z.number().min(1, "Quantidade é obrigatória"),
    dosage: z.string().min(1, "Dosagem é obrigatória"),
    laboratory: z.string().min(1, "Laboratório é obrigatório"),
    requiresPrescription: z.boolean(),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function FormularioScreen() {

    const { data, loading, error, xmlForm, setXmlForm } = useGetCategory()

    const { register, setValue, handleSubmit, control, reset,
        formState: { errors } } = useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                name: "",
                price: 0,
                category: 0,
                description: "",
                quantity: 0,
                dosage: "",
                laboratory: "",
                requiresPrescription: false,
            },
        });

    return (
        <SafeAreaView
            style={{ flex: 1, width: width }}
            className="flex-1 w-full">
            <ScrollView className="p-5">
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
                                            placeholder="Nome do produto"
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
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px] border-[#8298ab]">
                                <MaterialIcons name="attach-money" size={24} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="price"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("price")}
                                            placeholder="Preço"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className="w-full"
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                const numericValue = parseFloat(text);
                                                onChange(isNaN(numericValue) ? "" : numericValue);
                                            }}
                                            value={value.toString()}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.price && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.price?.message !== "Required" ? errors.price?.message : "Preencha o preço do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row  justify-center items-center border-r-[.9px] border-[#8298ab]">
                            <MaterialCommunityIcons name="medical-bag" size={24} color="white" />
                        </View>
                        <View className="w-[85%] h-full">
                            <Controller
                                control={control}
                                name="category"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        {...register("category")}
                                        mode="dropdown"
                                        style={{ height: "100%" }}
                                        className=" w-full"
                                        selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
                                        <Picker.Item label="Selecione a categoria..." value="" style={{ color: "#d1d1d1" }} />
                                        {data?.map((item: any, index: number) => (<Picker.Item key={index} label={item.name} value={item.id} />))}
                                    </Picker>
                                )}
                            />
                            {loading && <ActivityIndicator className="absolute top-[30%] right-[10%]" />}
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.category && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.category?.message !== "Required" ? errors.category?.message : "Preencha a categoria do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-full h-full flex-row overflow-hidden">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                                <FontAwesome6 name="box-open" size={20} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="quantity"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("quantity")}
                                            placeholder="Quantidade"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className="w-full"
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                const numericValue = parseFloat(text);
                                                onChange(isNaN(numericValue) ? "" : numericValue);
                                            }}
                                            value={value.toString()}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.quantity && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.quantity?.message !== "Required" ? errors.quantity?.message : "Preencha a quantidade do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-full h-full flex-row overflow-hidden">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                                <FontAwesome6 name="box-open" size={20} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="dosage"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("dosage")}
                                            placeholder="Dosagem do produto"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className=" w-full "
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value.toString()}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.dosage && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.dosage?.message !== "Required" ? errors.dosage?.message : "Preencha a dosagem do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-full h-full flex-row overflow-hidden">
                            <View className="w-[15%] h-full bg-[#2196f3] flex-row justify-center items-center border-r-[.9px]  border-[#8298ab]">
                                <FontAwesome6 name="box-open" size={20} color="white" />
                            </View>
                            <View className="w-[85%] h-[100%]">
                                <Controller
                                    control={control}
                                    name="laboratory"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            {...register("laboratory")}
                                            placeholder="laboratorio do produto"
                                            placeholderTextColor={"#d1d1d1"}
                                            style={{ height: "100%" }}
                                            className=" w-full "
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value.toString()}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.laboratory && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.laboratory?.message !== "Required" ? errors.laboratory?.message : "Preencha o laboratório do produto"}
                    </Text>
                </View>
                <View className="mb-1">
                    <FormContainer xmlForm={xmlForm}>
                        <View className="w-[15%] h-full bg-[#2196f3] flex-row  justify-center items-center border-r-[.9px] border-[#8298ab]">
                            <MaterialCommunityIcons name="medical-bag" size={24} color="white" />
                        </View>
                        <View className="w-[85%] h-full">
                            <Controller
                                control={control}
                                name="requiresPrescription"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        {...register("requiresPrescription")}
                                        mode="dropdown"
                                        style={{ height: "100%" }}
                                        className=" w-full"
                                        selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
                                        <Picker.Item label="Necessidade de Prescrição..." value="" style={{ color: "#d1d1d1" }} />
                                        <Picker.Item label={"Sim"} value={true} />
                                        <Picker.Item label={"Não"} value={false} />
                                    </Picker>
                                )}
                            />
                        </View>
                    </FormContainer>
                    <Text
                        style={{ opacity: errors.requiresPrescription && xmlForm == false ? 1 : 0 }}
                        className="text-[#616161] text-[10px]">
                        {errors.requiresPrescription?.message !== "Required" ? errors.requiresPrescription?.message : "Preencha a categoria do produto"}
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
                                name="description"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        {...register("description")}
                                        placeholder="Descrição do produto"
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
                            style={{ opacity: errors.description && xmlForm == false ? 1 : 0 }}
                            className="text-[#616161] text-[10px]">
                            {errors.description?.message !== "Required" ? errors.description?.message : "Preencha a descrição da bula"}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ marginBottom: height / 9 }}
                    className="mt-4 w-full">
                    <XmlFilePicker setXmlForm={setXmlForm} reset={reset} url="http://192.168.0.166:3000/product/create" />
                    {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} url="http://192.168.0.166:3000/product/create" />}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}