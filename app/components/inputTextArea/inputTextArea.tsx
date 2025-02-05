import { Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";

export default function InputTextareaContainer({ xmlForm, errors, control, register, name, icon, placeholder }: { xmlForm: boolean, errors: any, control: any, register: any, name: string, icon?: any, placeholder: string }) {
    return (
        <View className="mb-1"
            style={{ opacity: xmlForm ? 0.2 : 1 }}
            pointerEvents={xmlForm ? "none" : "auto"}
        >
            <View className={`flex-row overflow-hidden rounded-md ${errors && !xmlForm ? 'border-red-500' : 'border-[#00A995]'} border-[.9px] h-[120px]`}>
                <View className="w-[15%] h-full flex-row justify-center items-center border-r-[.6px] border-[#00A995]">
                    {icon}
                </View>
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            {...register(name)}
                            placeholder={placeholder}
                            placeholderTextColor={"#94a3b8"}
                            multiline
                            numberOfLines={100}
                            className="w-[85%] h-[100%] px-3 pt-3 text-[15px] font-light text-black"
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            textAlignVertical="top"
                        />
                    )}
                />
            </View>
            {errors && !xmlForm && (
                <Text className="text-red-500 text-[12px] mt-1 ml-1">
                    {errors?.message !== "Required" ? errors?.message : `${name} é obrigatório`}
                </Text>
            )}
        </View>
    );
}