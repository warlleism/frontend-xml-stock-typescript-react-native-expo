import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from 'react-hook-form';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from "@hookform/resolvers/zod"
import useGetCategory from "../../../hooks/useGetCategory";
import InputTextContainer from "../../inputText/inputText";
import InputTextareaContainer from "../../inputTextArea/inputTextArea";
import InputPickerContainer from "../../inputPicker/inputPicker";
import { z } from "zod";
import { useEffect, useState } from "react";
import useGetActivePrinciples from "@/app/hooks/useGetActivePrinciples";
import Entypo from "@expo/vector-icons/Entypo";

const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    price: z.number().min(1, "Preço é obrigatório"),
    category: z.number().min(1, "Categoria é obrigatória"),
    description: z.string().min(1, "Descrição é obrigatória"),
    quantity: z.number().min(1, "Quantidade é obrigatória"),
    dosage: z.number().min(1, "Dosagem é obrigatória"),
    laboratory: z.string().min(1, "Laboratório é obrigatório"),
    requiresPrescription: z.string().min(1, "Laboratório é obrigatório"),
    activePrinciple: z.number().min(1, "Principio ativo é obrigatório"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function FormularioScreen() {

    const [xmlForm, setXmlForm] = useState<boolean>(false);
    const { data: categoryes } = useGetCategory()
    const { data: activePrinciples } = useGetActivePrinciples()

    useEffect(() => {
        reset()
    }, [xmlForm])

    const { register, handleSubmit, control, reset,
        formState: { errors } } = useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                name: "",
                price: 0,
                category: 0,
                description: "",
                dosage: 0,
                quantity: 0,
                laboratory: "",
                activePrinciple: 0,
                requiresPrescription: "",
            },
        });

    return (
        <SafeAreaView
            style={{ flex: 1, width: width }}
            className="flex-1 w-full bg-[#fff]">
            <ScrollView className="px-5">
                <InputTextContainer xmlForm={xmlForm} errors={errors.name} control={control} register={register} type="text" name="name" icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="#00A995" />} placeholder="Nome do produto" />
                <InputTextContainer xmlForm={xmlForm} errors={errors.quantity} control={control} register={register} type="number" name="quantity" icon={<FontAwesome6 name="truck-ramp-box" size={20} color="#00A995" />} placeholder="Quantidade" />
                <InputTextContainer xmlForm={xmlForm} errors={errors.price} control={control} register={register} type="number" name="price" icon={<MaterialIcons name="attach-money" size={24} color="#00A995" />} placeholder="Preço" />
                <InputPickerContainer
                    xmlForm={xmlForm}
                    errors={errors.category}
                    control={control}
                    register={register}
                    name="category"
                    icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />}
                    placeholder="Categoria"
                    options={categoryes?.map((item: any) => ({ label: item.name, value: item.id })) || []}
                />
                <InputPickerContainer
                    xmlForm={xmlForm}
                    errors={errors.activePrinciple}
                    control={control}
                    register={register}
                    name="activePrinciple"
                    icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />}
                    placeholder="Principio ativo"
                    options={activePrinciples?.map((item: any) => ({ label: item.name, value: item.id })) || []}
                />
                <InputTextContainer xmlForm={xmlForm} errors={errors.dosage} control={control} register={register} type="number" name="dosage" icon={<Fontisto name="injection-syringe" size={24} color="#00A995" />} placeholder="Dosagem" />
                <InputTextContainer xmlForm={xmlForm} errors={errors.laboratory} control={control} register={register} type="text" name="laboratory" icon={<Entypo name="documents" size={25} color="#00A995" />} placeholder="Laboratório" />
                <InputPickerContainer
                    xmlForm={xmlForm}
                    errors={errors.requiresPrescription}
                    control={control}
                    register={register}
                    name="requiresPrescription"
                    icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />}
                    placeholder="Necessidade de Prescrição"
                    options={[
                        { label: "Sim", value: "true" },
                        { label: "Não", value: "false" }
                    ]} />
                <InputTextareaContainer xmlForm={xmlForm} errors={errors.description} control={control} register={register} name="description" icon={<MaterialIcons name="description" size={24} color="#00A995" />} placeholder="Descrição do produto" />
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