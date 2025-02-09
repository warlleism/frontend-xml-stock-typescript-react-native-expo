import { Product } from "@/app/hooks/useGetProducts";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { Text, TouchableOpacity } from "react-native";
import { Toast } from "toastify-react-native";

export default function DeleteButton({ data, setData, setModal, url, id }: { data: any, setData: any, setModal: any, url: string, id: number }) {

    const handleDelete = (id: number) => {
        const deleteItem = data?.data.filter((item: Product) => item.id !== id)
        setData({ ...data, data: deleteItem })
    }


    const Submit = async () => {
        try {
            const response = await axios.delete(`http://192.168.0.167:3000/product/delete?id=${id}`)
            if (response.status == 200) {
                handleDelete(id);
                Toast.success("Excluído com sucesso!");
            } else {
                Toast.error("Erro ao excluir!");
            }
        } catch (error) {
            console.log(error);
            Toast.error("Erro ao excluir!");
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