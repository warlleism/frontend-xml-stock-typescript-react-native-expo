import { ButtomSubmitProps } from "@/app/Types/ButtomSubmitProps";
import { Text, TouchableOpacity } from "react-native";

export default function ButtomSubmit({ handleSubmit }: ButtomSubmitProps) {
    return (
        <TouchableOpacity
            className="mb-1 mt-4 w-full bg-black rounded-md py-8 p-2"
            onPress={handleSubmit((data: any) => {
                console.log(data);
            })} >
            <Text className="text-white text-center text-xl">Enviar</Text>
        </TouchableOpacity>
    )
}