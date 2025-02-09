import { Dimensions, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputTextContainer from "../inputText/inputText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useGetCategory from "@/app/hooks/useGetCategory";
import useGetActivePrinciples from "@/app/hooks/useGetActivePrinciples";
import InputPickerContainer from "../inputPicker/inputPicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ButtomSubmit from "../buttomSubmit/buttomSubmit";
import InputTextareaContainer from "../inputTextArea/inputTextArea";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect } from "react";

const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    price: z.number().min(1, "Preço é obrigatório"),
    categoryid: z.number().min(1, "Categoria é obrigatória"),
    description: z.string().min(1, "Descrição é obrigatória"),
    quantity: z.number().min(1, "Quantidade é obrigatória"),
    dosage: z.string().min(1, "Dosagem é obrigatória"),
    laboratory: z.string().min(1, "Laboratório é obrigatório"),
    requiresPrescription: z.string().min(1, "Laboratório é obrigatório"),
    principleactiveid: z.number().min(1, "Principio ativo é obrigatório"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function ModalizeEdit({ item, modalizeRef }: any) {

    const { data: categoryes } = useGetCategory();
    const { data: activePrinciples } = useGetActivePrinciples();

    const defaultValues = {
        name: item?.name || "",
        price: item?.price || 0,
        categoryid: item?.categoryid || 0,
        description: item?.description || "",
        dosage: item?.dosage || "",
        quantity: item?.quantity || 0,
        laboratory: item?.laboratory || "",
        principleactiveid: item?.principleactiveid || 0,
        requiresPrescription: item?.requiresPrescription || "",
    };

    const { register, handleSubmit, control, reset, watch, formState: { errors } } =
        useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues,
        });

    useEffect(() => {
        reset(defaultValues);
    }, [item, reset]);


    return (
        <Modalize
            keyboardAvoidingBehavior="padding"
            adjustToContentHeight
            modalStyle={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: 20,
                width: width,
                elevation: 1
            }}
            handleStyle={{
                position: "absolute",
                top: 25,
                elevation: 1,
                width: "20%",
                backgroundColor: "#00A995"
            }}
            scrollViewProps={{
                keyboardShouldPersistTaps: 'handled',
                contentContainerStyle: { flexGrow: 1 }
            }}
            ref={modalizeRef}>
            <Text className="text-2xl font-bold text-center mb-5">Editar Produto</Text>
            <View
                style={{ height: height - 250 }}
                className="w-full">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: height / 23 }}
                >
                    <InputTextContainer errors={errors.name} control={control} register={register} type="text" name="name" icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="#00A995" />} placeholder="Nome do produto" />
                    <InputTextContainer errors={errors.quantity} control={control} register={register} type="number" name="quantity" icon={<FontAwesome6 name="truck-ramp-box" size={17} color="#00A995" />} placeholder="Quantidade" />
                    <InputTextContainer errors={errors.price} control={control} register={register} type="number" name="price" icon={<MaterialIcons name="attach-money" size={24} color="#00A995" />} placeholder="Preço" />
                    <InputTextContainer errors={errors.dosage} control={control} register={register} type="text" name="dosage" icon={<Fontisto name="injection-syringe" size={24} color="#00A995" />} placeholder="Dosagem" />
                    <InputTextContainer errors={errors.laboratory} control={control} register={register} type="text" name="laboratory" icon={<Entypo name="documents" size={25} color="#00A995" />} placeholder="Laboratório" />
                    <InputPickerContainer watch={watch} errors={errors.principleactiveid} control={control} register={register} name="principleactiveid" icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />} placeholder="Principio ativo" options={activePrinciples?.map((item: any) => ({ label: item.name, value: item.id })) || []} />
                    <InputPickerContainer watch={watch} errors={errors.categoryid} control={control} register={register} name="categoryid" icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />} placeholder="Categoria" options={categoryes?.map((item: any) => ({ label: item.name, value: item.id })) || []} />
                    <InputPickerContainer watch={watch} errors={errors.requiresPrescription} control={control} register={register} name="requiresPrescription" icon={<MaterialCommunityIcons name="medical-bag" size={24} color="#00A995" />} placeholder="Necessidade de Prescrição" options={[{ label: "Sim", value: "true" }, { label: "Não", value: "false" }]} />
                    <InputTextareaContainer errors={errors.description} control={control} register={register} name="description" icon={<MaterialIcons name="description" size={24} color="#00A995" />} placeholder="Descrição do produto" />
                    <ButtomSubmit handleSubmit={handleSubmit} reset={reset} url="http://192.168.0.167:3000/product/update" />
                </ScrollView>
            </View>
        </Modalize >
    );
}
