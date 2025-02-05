import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from 'react-hook-form';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import InputTextContainer from "../../inputText/inputText";
import InputTextareaContainer from "../../inputTextArea/inputTextArea";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    bula: z.string().min(1, "Bula é obrigatória"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function ActiveFormScreen() {

    const [xmlForm, setXmlForm] = useState<boolean>(false);

    useEffect(() => {
        reset()
    }, [xmlForm])

    const { register, handleSubmit, control, reset,
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
            <InputTextContainer xmlForm={xmlForm} errors={errors.name} control={control} register={register} type="text" name="name" icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="#00A995" />} placeholder="Nome do princípio ativo" />
            <InputTextareaContainer xmlForm={xmlForm} errors={errors.bula} control={control} register={register} name="bula" icon={<MaterialIcons name="description" size={24} color="#00A995" />} placeholder="Bula do princípio ativo" />
            <View
                className="w-full absolute bottom-0 self-center">
                <XmlFilePicker setXmlForm={setXmlForm} reset={reset} url="http://192.168.0.167:3000/active/create" />
                {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} reset={reset} url="http://192.168.0.167:3000/active/create" />}
            </View>
        </SafeAreaView >
    );
}