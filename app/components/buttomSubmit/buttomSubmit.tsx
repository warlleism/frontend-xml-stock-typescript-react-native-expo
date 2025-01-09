import { ButtomSubmitProps } from "@/app/Types/ButtomSubmitProps";
import { Text, TouchableOpacity } from "react-native";

export default function ButtomSubmit({ handleSubmit }: ButtomSubmitProps) {
    return (
        <TouchableOpacity
            className="mb-1 mt-4 w-full bg-[#000000] rounded-sm py-6"
            onPress={handleSubmit((data: any) => {
                console.log(data);
            })} >
            <Text className="text-white text-center text-xl">Enviar</Text>
        </TouchableOpacity>
    )
}