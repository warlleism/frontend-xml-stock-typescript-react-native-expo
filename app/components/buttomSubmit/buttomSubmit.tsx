import axios from "axios";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Toast } from "toastify-react-native";

export default function ButtomSubmit({ handleSubmit, url, reset }: any) {

    async function Submit(data: any) {
        console.log(data);
        // const response = await axios.post(url, data)
        // if (response.status == 201) {
        //     Toast.success("Cadastrado feito com sucesso!");
        //     reset();
        // } else {
        //     Toast.error("Erro ao cadastrar!");
        // }
    }

    return (
        <TouchableOpacity
            className="mb-1 mt-4 w-full bg-[#00A995] rounded-sm py-6 flex-row gap-2 justify-center items-center"
            onPress={handleSubmit(Submit)} >
            <Ionicons name="send-sharp" size={24} color="white" />
            <Text className="text-white text-center text-xl">Enviar</Text>
        </TouchableOpacity>
    )
}