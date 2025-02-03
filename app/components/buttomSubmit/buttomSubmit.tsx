import axios from "axios";
import { Text, TouchableOpacity } from "react-native";

export default function ButtomSubmit({ handleSubmit, url }: any) {

    async function Submit(data: any) {
        console.log(data)
        // const response = await axios.post(url, data)
        // console.log(response.data)
    }

    return (
        <TouchableOpacity
            className="mb-1 mt-4 w-full bg-[#2196f3] rounded-sm py-6"
            onPress={handleSubmit(Submit)} >
            <Text className="text-white text-center text-xl">Enviar</Text>
        </TouchableOpacity>
    )
}