import { Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";

export default function FormContainer({ xmlForm, errors, control, register, name, type, icon, placeholder, textArea }: { xmlForm: boolean, errors: any, control: any, register: any, name: string, type: string, icon?: any, placeholder: string, textArea?: boolean }) {
    return (
        <View className="w-full mb-4">
            <View
                className={`w-full h-[55px] flex flex-row justify-center items-center border-[1px] ${errors && !xmlForm ? 'border-red-500' : 'border-[#8298ab]'} overflow-hidden rounded-xl bg-white shadow-sm`}
                style={{ opacity: xmlForm ? 0.2 : 1 }}
                pointerEvents={xmlForm ? "none" : "auto"}
            >
                <View className="w-full h-full flex-row overflow-hidden">
                    <View className="w-[15%] h-full bg-[#1976d2] flex-row justify-center items-center">
                        {icon}
                    </View>
                    <View className="w-[85%] h-[100%] flex justify-center align-center">
                        {control && (
                            <Controller
                                control={control}
                                name={name}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        {...register(name)}
                                        style={{ paddingLeft: 15 }}
                                        placeholder={placeholder}
                                        placeholderTextColor={"#94a3b8"}
                                        placeholderStyle={{ textAlign: 'center', fontSize: 15, color: "red" }}
                                        keyboardType={type == "number" ? "numeric" : "default"}
                                        className="w-full bg-white"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                            />
                        )}
                    </View>
                </View>
            </View>
            {errors && !xmlForm && (
                <Text className="text-red-500 text-[12px] mt-1 ml-1">
                    {errors?.message !== "Required" ? errors?.message : `${name} é obrigatório`}
                </Text>
            )}
        </View>
    );
}