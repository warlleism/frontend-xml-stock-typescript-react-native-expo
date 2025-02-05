import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from 'react-hook-form';
import ButtomSubmit from "../../buttomSubmit/buttomSubmit";
import XmlFilePicker from "../../fileInput/fileInput";
import { zodResolver } from "@hookform/resolvers/zod"
import InputTextContainer from "../../inputText/inputText";
import { useEffect, useState } from "react";
import InputTextareaContainer from "../../inputTextArea/inputTextArea";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { z } from "zod";
const { width, height } = Dimensions.get('window');

const createUserFormSchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
    description: z.string().min(1, "Descrição da categoria é obrigatória"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function CategoryFormScreen() {

    const [xmlForm, setXmlForm] = useState<boolean>(false);

    useEffect(() => {
        reset()
    }, [xmlForm])

    const { register, handleSubmit, control, reset,
        formState: { errors } } = useForm<createUserFormData>({
            resolver: zodResolver(createUserFormSchema),
            defaultValues: {
                name: "",
                description: "",
            },
        });

    return (
        <SafeAreaView className="px-5" style={{ width: width, height: height - 200 }}>
            <View style={{ height: height - 60 }}>
                <InputTextContainer xmlForm={xmlForm} errors={errors.name} control={control} register={register} type="text" name="name" icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="#00A995" />} placeholder="Nome da categoria" />
                <InputTextareaContainer xmlForm={xmlForm} errors={errors.description} control={control} register={register} name="description" icon={<MaterialIcons name="description" size={24} color="#00A995" />} placeholder="Descrição da categoria" />
            </View>
            <View
                className="w-full absolute bottom-0 self-center">
                <XmlFilePicker setXmlForm={setXmlForm} reset={reset} url="http://192.168.0.167:3000/category/create" />
                {!xmlForm && <ButtomSubmit handleSubmit={handleSubmit} reset={reset} url="http://192.168.0.167:3000/category/create" />}
            </View>
        </SafeAreaView >
    );
}