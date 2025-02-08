import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { Text, TouchableOpacity } from "react-native";
import { Toast } from "toastify-react-native";

export default function DeleteButton({ setModal, url, id }: { setModal: any, url: string, id: number }) {

    async function Submit() {
        try {
            console.log(url);
            const response = await axios.get(url)
            console.log(response);
            if (response.status == 201) {
                Toast.success("Excluído com sucesso!");
            } else {
                Toast.error("Erro ao excluir!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setModal(false);
        }
    }
    return (
        <TouchableOpacity
            className="w-[48%] items-center justify-center bg-red-500 h-12 rounded-full shadow-md"
            onPress={Submit}>
            <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
    );
}